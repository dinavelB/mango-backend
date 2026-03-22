import nodemailer from "nodemailer";
import env from "dotenv";
import crypto from "crypto";
env.config();

export class EmailService {
  private transporter: nodemailer.Transporter;
  private FROM_NAME?: string;
  private FROM_EMAIL?: string;
  private APP_URL?: string;
  private DEV_URL?: string;
  otp = this.generateOtp();
  constructor() {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_KEY,
      FROM_NAME,
      FROM_EMAIL,
      APP_URL,
      DEV_URL,
    } = process.env;

    this.FROM_NAME = FROM_NAME || "Chronova";
    this.FROM_EMAIL = FROM_EMAIL;
    this.APP_URL = APP_URL;
    this.DEV_URL = DEV_URL;

    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_KEY,
      },
    });
  }

  private generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  async sendVerificationEmail(to: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"${this.FROM_NAME}" <${this.FROM_EMAIL}>`,
      to,
      subject: "Verify Your Email - Chronova",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="margin: 0 0 16px 0; font-size: 24px; text-align: center; color: #333;">Welcome to Chronova!</h2>
          
          <p style="margin: 0 0 18px 0; font-size: 16px; text-align: center; color: #666;">Please use the following OTP to verify your email address:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; padding: 15px 30px; background-color: #f5f5f5; border-radius: 8px; font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #333;">
              ${this.otp}
            </div>
          </div>
          
          <p style="margin: 0 0 10px 0; font-size: 14px; text-align: center; color: #999;">This OTP will expire in 10 minutes</p>
          <p style="margin: 0 0 18px 0; font-size: 14px; text-align: center; color: #999;">If you didn't request this, please ignore this email</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
          
          <p style="margin: 0 0 18px 0; font-size: 14px; text-align: center; color: #666;">Once verified, you will be able to log in and enjoy Chronova.</p>
          
          <p style="margin: 0 0 18px 0; font-size: 14px; text-align: center; color: #666;">Need help? Contact us at kyomichan0206@gmail.com</p>
          
          <div style="margin-top: 30px; text-align: center;">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666;">Best regards,</p>
            <p style="margin: 0; font-size: 16px; font-weight: 700; color: #333;">Chronova Team</p>
          </div>
        </div>
      `,
    });
  }
}

export const email = new EmailService();
