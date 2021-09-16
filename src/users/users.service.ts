import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/photos/photo.entity';
import { PhotosService } from 'src/photos/photos.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private photoService: PhotosService
  ) { }

  async createUser(createData: CreateUserDto): Promise<User> {

    const user = new User();
    user.firstName = createData.firstName;
    user.lastName = createData.lastName;
    user.password = createData.password;

    const photo = await this.photoService.getById(createData.photo);

    if (!photo) {
      throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
    }

    user.photos = [photo];
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id, { relations: ["photo"] });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateUser(id: string, updateData: CreateUserDto) {
    return await this.userRepository.update(id, updateData);
  }
}
