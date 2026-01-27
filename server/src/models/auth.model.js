const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  user_id: { 
    type: String, 
    unique: true, 
    required: true,
    default: function() {
      return `USR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
  },
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30
  },
  password: { 
    type: String, 
    required: function() {
      return !this.social_auth_provider;
    },
    minlength: 6
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  fullname: { type: String, required: true },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  role: { 
    type: String, 
    enum: ['customer', 'restaurant_owner', 'admin', 'delivery_partner'],
    default: 'customer'
  },
  
  // Social Authentication
  social_auth_provider: {
    type: String,
    enum: ['google', null],
    default: null
  },
  social_auth_id: {
    type: String,
    sparse: true
  },
  profile_image: {
    type: String,
    default: null
  },
  
  // Verification & Security
  is_verified: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  email_verified: { type: Boolean, default: false },
  email_verification_token: String,
  email_verification_expires: Date,
  
  // Password Reset
  reset_password_token: String,
  reset_password_expires: Date,
  
  // Login Security
  last_login: { type: Date },
  login_attempts: { type: Number, default: 0 },
  lock_until: { type: Date },
  
  // Refresh Token
  refresh_tokens: [{
    token: String,
    created_at: { type: Date, default: Date.now },
    expires_at: Date,
    device_info: String
  }],
  
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ social_auth_id: 1 }, { sparse: true });

// Virtual for account locked status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lock_until && this.lock_until > Date.now());
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  if (this.lock_until && this.lock_until < Date.now()) {
    return await this.updateOne({
      $set: { login_attempts: 1 },
      $unset: { lock_until: 1 }
    });
  }
  
  const updates = { $inc: { login_attempts: 1 } };
  const maxAttempts = 5;
  const lockTime = 2 * 60 * 60 * 1000; // 2 hours
  
  if (this.login_attempts + 1 >= maxAttempts && !this.isLocked) {
    updates.$set = { lock_until: Date.now() + lockTime };
  }
  
  return await this.updateOne(updates);
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = async function() {
  return await this.updateOne({
    $set: { login_attempts: 0 },
    $unset: { lock_until: 1 }
  });
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.email_verification_token = crypto.createHash('sha256').update(token).digest('hex');
  this.email_verification_expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return token;
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.reset_password_token = crypto.createHash('sha256').update(token).digest('hex');
  this.reset_password_expires = Date.now() + 60 * 60 * 1000; // 1 hour
  return token;
};

module.exports = mongoose.model('User', userSchema);