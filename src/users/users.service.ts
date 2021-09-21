import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
import { PhotosService } from 'src/photos/photos.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Omit, omit } from 'lodash';
import { resolve } from 'path/posix';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private photoService: PhotosService,
    private carsService: CarsService,
  ) { }

  async createUser(createData: CreateUserDto): Promise<Omit<User, "password">> {
    try {

      const user = new User();
      user.firstName = createData.firstName;
      user.lastName = createData.lastName;
      user.password = createData.password;
      user.email = createData.email;

      const photo = await this.photoService.getById(createData.photo);
      if (!photo) {
        throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
      }

      const car = await this.carsService.findById(createData.carNo);
      if (!car) {
        throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
      }

      user.photos = [photo];
      user.cars = [car];

      await this.userRepository.save(user);
      //@ts-ignore
      return new Promise(resolve => resolve(omit(user), "password"));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['cars', 'photos'],
      select: ['firstName', 'lastName', 'email', 'isActive', 'photos', 'cars']
    });
  }

  findOneWithPassword(id: string): Promise<User> {
    return this.userRepository.findOne(id, { relations: ['cars', "photos"] });
  }

  findOne(id: string): Promise<User> {
    this.logger.log(`fetching user by id : ${id}`)
    return this.userRepository.findOne(id, {
      relations: ['cars', "photos"],
      select: ['firstName', 'lastName', 'email', 'isActive', 'photos', 'cars']
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateUser(id: string, updateData: CreateUserDto) {
    return await this.userRepository.update(id, updateData);
  }

  findByEmailWithPassword(email: string): Promise<User> {
    return this.userRepository.findOne({ email }, { relations: ['cars', "photos"] })
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email }, {
      relations: ['cars', "photos"],
      select: ['firstName', 'lastName', 'email', 'isActive', 'photos', 'cars']
    })
  }
}
