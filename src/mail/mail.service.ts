import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { sendEmailDto } from './dto/mail.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly maxRetries = 3;
  private emailQueue: sendEmailDto[] = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private readonly eventEmitter: EventEmitter2,
  ) {}


  scheduleEmail(emailDto: sendEmailDto) {
    if (!emailDto.scheduleTime) {
        emailDto.scheduleTime = new Date().toISOString();  
    }
    this.emailQueue.push(emailDto);
    this.logger.log(`Email scheduled to ${emailDto.recipients} at ${emailDto.scheduleTime}`);
}

@Cron(CronExpression.EVERY_10_SECONDS)
async processScheduledEmails() {
    const now = new Date();
    const remainingEmails: sendEmailDto[] = [];

    for (const email of this.emailQueue) {
        if (email.scheduleTime && new Date(email.scheduleTime) <= now) {
            await this.scheduleEmail(email);
        } else {
            remainingEmails.push(email); 
        }
    }
    this.emailQueue = remainingEmails;
}


  // @Cron(CronExpression.EVERY_10_SECONDS)
  async sendEventReminder(recipients: string[], subject: string, date: string ) {
    if (!recipients || recipients.length === 0) {
      this.logger.error('Event reminder email failed: No recipient email provided.');
      return;
    }
  
    try {
      await this.mailerService.sendMail({
        to: recipients,
        subject: 'Event Reminder',
        text: `Reminder: Your event "${subject}" is scheduled on ${date}.`,
        context: {subject, date}
      });
  
      this.logger.log(`Event reminder sent to ${recipients}`);
    } catch (error) {
      this.logger.error(`Failed to send event reminder to ${recipients}`, error.stack);
    }
  }

  async sendRegistrationConfirmation(email: string[], name: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Registration successful email',
        text: 'Thank you for registering. We are excited to have you on board.',
        context: {
          name,
        },
      });
      this.logger.log(`Registration email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send registration email to ${email}`, error);
    }
  }

  async sendEventBookingConfirmation(
    email: string[],
    name: string,
    event: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Event Booking Confirmation Email',
        text: `Your booking for the event ${{ event }} is confirmed.`,
        context: { name, event },
      });
      this.logger.log(`Event booking confirmation sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send event booking confirmation to ${email}`,
        error.stack,
      );
    }
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  // async processScheduledEmails() {
  //   const now = new Date();
  //   this.emailQueue = this.emailQueue.filter(async (email) => {
  //     if (email.scheduleTime && new Date(email.scheduleTime) <= now) {
  //       await this.sendMail(email.to, email.subject, email.text);
  //       return false;
  //     }
  //     return true;
  //   });
  // }  

  async sendBookingCancellation(email: string[], name: string, event: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Booking Cancellation',
        text: `Your booking for the event ${event} has been cancelled.`,
        context: { name, event },
      });
      this.logger.log(`Booking cancellation email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send booking cancellation email to ${email}`,
        error.stack,
      );
    }
  }

  emailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
    transporter.verify(function (error: any, success: any) {
      if (error) {
        console.error('SMTP Verification Failed:', error);
      } else {
        console.log('SMTP Server is Ready', success);
      }
    });
    return transporter;
  }

  async sendEmailWithRetry(
    to: string[],
    subject: string,
    template: string,
    context: any,
    retries = 0,
  ) {
    try {
      await this.mailerService.sendMail({ to, subject, template, context });
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      if (retries < this.maxRetries) {
        this.logger.warn(`Retrying email to ${to} (Attempt ${retries + 1})`);
        await this.sendEmailWithRetry(
          to,
          subject,
          template,
          context,
          retries + 1,
        );
      } else {
        this.logger.error(
          `Failed to send email to ${to} after ${this.maxRetries} attempts`,
          error,
        );
      }
    }
  }
}
