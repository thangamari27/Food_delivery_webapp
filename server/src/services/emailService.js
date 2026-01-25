// ============================================
// SERVICE: emailService
// ============================================
const nodemailer = require('nodemailer');
const config = require('../config/env');

class EmailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.initializeTransporter();
  }

  initializeTransporter(){
    try {
      if(!config.EMAIL_USER || !config.EMAIL_PASSWORD){
        console.warn('Email service not configured. Emails will be disabled.');
        this.isConfigured = false;
        return;
      }

      this.transporter = nodemailer.createTransport({
        service: config.EMAIL_SERVICE,
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASSWORD,
        }
      });
      this.verifyConnection();
    } catch (error) {
      console.error('Email service initialization failed:', error.message);
      this.isConfigured = false;
    }
  }

  async verifyConnection() {
    if (!this.transporter) return false;
    
    try {
      await this.transporter.verify();
      console.log('Email service ready');
      this.isConfigured = true;
      return true;
    } catch (error) {
      console.error('Email verification failed:', error.message);
      this.isConfigured = false;
      return false;
    }
  }

  async sendEmail(mailOptions) {
    if (!this.isConfigured || !this.transporter) {
      console.log('Email skipped (not configured):', mailOptions.to);
      return { success: false, skipEmail: true };
    }

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async sendVerificationEmail(email, token, fullName) {
    const frontendUrl = config.FRONTEND_URL;
    const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: config.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email - GoYum Food Delivery',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FF6B6B;">GoYum Food Delivery</h1>
          </div>
          <h2 style="color: #333;">Welcome, ${fullName}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Thank you for joining GoYum! Please verify your email address to activate your account.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="display: inline-block; padding: 14px 28px; background-color: #FF6B6B; 
                      color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #999; font-size: 14px;">
            Or copy and paste this link into your browser:
          </p>
          <p style="color: #666; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 4px;">
            ${verificationUrl}
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            This link will expire in 24 hours.<br>
            If you didn't create an account, please ignore this email.
          </p>
        </div>
      `
    };

    return this.sendEmail(mailOptions);
  }

  async sendPasswordResetEmail(email, token, fullName) {
    const frontendUrl = config.FRONTEND_URL;
    const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: config.EMAIL_FROM,
      to: email,
      subject: 'Password Reset - GoYum Food Delivery',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="color: #666;">Hi ${fullName},</p>
          <p style="color: #666;">You requested to reset your password. Click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="display: inline-block; padding: 14px 28px; background-color: #f44336; 
                      color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #999; font-size: 14px;">Or copy and paste:</p>
          <p style="color: #666; word-break: break-all; background: #f5f5f5; padding: 10px;">
            ${resetUrl}
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Expires in 1 hour. Ignore if you didn't request this.
          </p>
        </div>
      `
    };

    return this.sendEmail(mailOptions);
  }

  async sendWelcomeEmail(email, fullName) {
    const frontendUrl = config.FRONTEND_URL;
    
    const mailOptions = {
      from: config.EMAIL_FROM,
      to: email,
      subject: 'Welcome to GoYum!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #FF6B6B;">Welcome to GoYum, ${fullName}!</h2>
          <p style="color: #666;">Your email has been verified successfully!</p>
          <p style="color: #666;">Start ordering delicious food from your favorite restaurants.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${frontendUrl}/menu" 
               style="display: inline-block; padding: 14px 28px; background-color: #4CAF50; 
                      color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Browse Menu
            </a>
          </div>
        </div>
      `
    };

    return this.sendEmail(mailOptions);
  }
}

module.exports = new EmailService();