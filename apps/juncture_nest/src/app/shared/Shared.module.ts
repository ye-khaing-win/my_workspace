import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { PrismaModule } from './prisma/prisma.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [EmailsModule, PrismaModule, StorageModule],
})
export class SharedModule {}
