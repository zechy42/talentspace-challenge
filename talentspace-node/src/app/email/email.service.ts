import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '../../config/config.service';
import { SendEmailDto } from './dto/send-email.dto';
import * as path from 'path';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(requests: SendEmailDto[], template: string) {
    const promises = requests.map(data => {
      return this.mailerService.sendMail({
        to: data.email,
        from: 'TalentSpace Jobs',
        template: path.resolve(__dirname, 'templates', template),
        subject: data.subject,
        context: data.context,
      });
    });

    const sentEmailResponse = await Promise.allSettled(promises);

    console.log(sentEmailResponse);

    return {
      message: 'Email Sent successfully',
    };
  }
}
