const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/auth.model');
const AuthService = require('../services/authService');
const config = require('./env');

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: config.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google OAuth profile received:', profile.id);
    
    const email = profile.emails[0].value;
    const name = profile.displayName;
    const picture = profile.photos[0].value;
    const socialId = profile.id;

    const result = await AuthService.socialLogin('google', {
      id: socialId,
      email,
      name,
      picture
    });

    console.log(`Google OAuth successful for: ${email}`);
    return done(null, result.user);
  } catch (error) {
    console.error('Google OAuth error:', error.message);
    return done(error, null);
  }
}));

// Export passport instance
module.exports = passport;