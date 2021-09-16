
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cars } from './car.entity';
import { CarsService } from './cars.service';
import { ICars } from './dto/cars.dto';

@Controller('cars')
export class CarsController {

  constructor(private readonly carsService: CarsService) { }

  @Post()
  create(@Body() body: ICars): Promise<Cars> {
    return this.carsService.saveCar(body);
  }

  @Get()
  findAll(): Promise<Cars[]> {
    return this.carsService.findAll();
  }

}
