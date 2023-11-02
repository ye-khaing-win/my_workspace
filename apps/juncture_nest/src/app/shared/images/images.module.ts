import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [ImagesResolver, ImagesService],
})
export class ImagesModule {}
