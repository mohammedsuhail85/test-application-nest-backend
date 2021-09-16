import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cars } from './car.entity';
import { ICars } from './dto/cars.dto';

@Injectable()
export class CarsService {

  constructor(@InjectRepository(Cars) private carRepository: Repository<Cars>) { }

  saveCar(input: ICars): Promise<Cars> {
    return this.carRepository.save(input);
  }

  findById(id: number): Promise<Cars> {
    return this.carRepository.findOne(id, { relations: ['user'] });
  }

  findAll(): Promise<Cars[]> {
    return this.carRepository.find({ relations: ['user'] });
  }

}
