import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });
  async notifyEmail({ email, text }: NotifyEmailDto) {
    console.log(`sending email to :${email}`);
    try {
      const smtpUser = this.configService.get('SMTP_USER');
      console.log(`smtpUser => ${smtpUser}`);
      await this.transporter.sendMail({
        from: this.configService.get(smtpUser),
        to: email,
        subject: 'Sleepr Notification',
        text,
      });
      console.log(`Email notification sent successfully to: ${email}`);
    } catch (error) {
      console.log(`error -sending email notification:${error}`);
    }
  }
}
