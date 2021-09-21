import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cars } from './car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cars])],
  providers: [CarsService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  controllers: [CarsController],
  exports: [CarsService, TypeOrmModule]
})
export class CarsModule { }
