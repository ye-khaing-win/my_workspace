import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { FilesService } from '../files/files.service';

@Resolver('Image')
export class ImagesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation()
  async createImage(@Args({ name: 'image' }) image: any) {
    const { file } = await image;

    // return this.filesService.uploadImage(file);
  }

  // @Query('images')
  // findAll() {
  //   return this.imagesService.findAll();
  // }

  // @Query('image')
  // findOne(@Args('id') id: number) {
  //   return this.imagesService.findOne(id);
  // }

  // @Mutation('updateImage')
  // update(@Args('updateImageInput') updateImageInput: any) {
  //   return this.imagesService.update(updateImageInput.id, updateImageInput);
  // }

  // @Mutation('removeImage')
  // remove(@Args('id') id: number) {
  //   return this.imagesService.remove(id);
  // }
}
