import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  sendEmail(email: string) {
    const code = parseInt(
      Math.random()
        .toString()
        .substr(5, 6),
    );
    this.mailerService.sendMail({
      to: email,
      from: 'aimmeng@163.com',
      subject: '———— 彩虹计划 RainBow Project',
      template: 'email',
      context: {
        code,
      },
    });
    return {
      data: {
        code,
      },
      statusCode: 200,
      message: '发送成功',
    };
  }
}
