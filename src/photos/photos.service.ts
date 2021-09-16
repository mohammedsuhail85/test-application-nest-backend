import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotosService {

  constructor(@InjectRepository(Photo) private photoRepository: Repository<Photo>) { }

  createPhoto(inputData): Promise<Photo> {

    const photo = new Photo();
    photo.name = inputData.name;
    photo.value = inputData.value;

    return this.photoRepository.save(photo);
  }

  getAll(): Promise<Photo[]> {
    return this.photoRepository.find({ relations: ['user'] });
  }

  getById(id: number): Promise<Photo> {
    return this.photoRepository.findOne(id, { relations: ['user'] });
  }

  updatePhoto(id: number, updateData: Photo): Promise<UpdateResult> {
    return this.photoRepository.update(id, updateData);
  }

}
