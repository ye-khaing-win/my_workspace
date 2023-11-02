import { Global, Module } from '@nestjs/common';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/app/core/enums';
import { EmailOrigins } from './enums';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { Directions } from 'src/app/core/enums';
import { EmailsService } from './emails.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService): Promise<MailerOptions> => ({
        transport: {
          host: config.get<string>(EnvVariables.SMTP_HOST),
          port: +config.get<string>(EnvVariables.SMTP_PORT),
          auth: {
            user: config.get<string>(EnvVariables.SMTP_USERNAME),
            pass: config.get<string>(EnvVariables.SMTP_PASSWORD),
          },
        },
        defaults: {
          from: EmailOrigins.NOT_REPLY,
        },
        template: {
          dir: join(__dirname, Directions.TEMPLATES),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
