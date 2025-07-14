import nodemailer from 'nodemailer';

/**
 * Email service for sending notifications
 */
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(to: string, firstName: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Welcome to SustainaLink!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #33A3CC;">Welcome to SustainaLink, ${firstName}!</h2>
          <p>Thank you for joining our sustainability platform. You're now part of a community committed to making a positive environmental impact.</p>
          <p>Get started by:</p>
          <ul>
            <li>Exploring sustainable products</li>
            <li>Tracking your carbon footprint</li>
            <li>Earning rewards for sustainable choices</li>
            <li>Connecting with eco-conscious suppliers</li>
          </ul>
          <p>Together, we can build a more sustainable future!</p>
          <p>Best regards,<br>The SustainaLink Team</p>
        </div>
      `,
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await this.transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${to}`);
      } else {
        console.log(`Email would be sent to ${to} (email service not configured)`);
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Password Reset Request - SustainaLink',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #33A3CC;">Password Reset Request</h2>
          <p>You requested a password reset for your SustainaLink account.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="background-color: #33A3CC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this reset, please ignore this email.</p>
          <p>Best regards,<br>The SustainaLink Team</p>
        </div>
      `,
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await this.transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${to}`);
      } else {
        console.log(`Password reset email would be sent to ${to} (email service not configured)`);
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }

  /**
   * Send ESG report notification
   */
  async sendESGReportNotification(to: string, supplierName: string, reportUrl: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: `ESG Report Generated for ${supplierName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #33A3CC;">ESG Report Ready</h2>
          <p>The ESG report for <strong>${supplierName}</strong> has been generated and is ready for review.</p>
          <a href="${reportUrl}" style="background-color: #34A888; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Report</a>
          <p>This report includes comprehensive environmental, social, and governance metrics.</p>
          <p>Best regards,<br>The SustainaLink Team</p>
        </div>
      `,
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await this.transporter.sendMail(mailOptions);
        console.log(`ESG report notification sent to ${to}`);
      } else {
        console.log(`ESG report notification would be sent to ${to} (email service not configured)`);
      }
    } catch (error) {
      console.error('Error sending ESG report notification:', error);
    }
  }
}

export default new EmailService();
