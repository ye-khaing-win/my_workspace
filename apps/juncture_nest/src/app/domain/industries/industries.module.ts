import { Module } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { IndustriesResolver } from './industries.resolver';

@Module({
  providers: [IndustriesResolver, IndustriesService],
})
export class IndustriesModule {}
