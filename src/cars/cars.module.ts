import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from './car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cars])],
  providers: [CarsService],
  controllers: [CarsController],
  exports: [CarsService, TypeOrmModule]
})
export class CarsModule { }
