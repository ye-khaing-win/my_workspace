import { Module } from '@nestjs/common';

import { CoreModule } from './core/Core.module';
import { SharedModule } from './shared/Shared.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [CoreModule, SharedModule, DomainModule],
})
export class AppModule {}
