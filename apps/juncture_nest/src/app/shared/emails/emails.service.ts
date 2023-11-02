import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMemberInvitationEmailContext } from './interfaces';
import { EmailSubjects, EmailTemplates } from './enums';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMemberInvitationEmaiil(params: {
    recipient: string;
    context: IMemberInvitationEmailContext;
  }): Promise<void> {
    const { recipient, context } = params;
    this.mailerService.sendMail({
      to: recipient,
      subject: EmailSubjects.MEMBER_INVITATION,
      template: EmailTemplates.MEMBER_INVITATION,
      context,
    });
  }
}
