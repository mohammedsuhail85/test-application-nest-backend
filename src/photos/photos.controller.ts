import { Body, Controller, Get, Post } from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {

  constructor(
    private photoService: PhotosService
  ) { }

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photoService.getAll();
  }

  @Post()
  createPhoto(@Body() input: any): Promise<Photo> {
    return this.photoService.createPhoto(input);
  }
}
