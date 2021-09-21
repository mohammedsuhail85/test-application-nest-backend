import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from 'src/cars/cars.module';
import { PhotosModule } from 'src/photos/photos.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersMiddleware } from './users.middleware';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PhotosModule, CarsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule, UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware).forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
