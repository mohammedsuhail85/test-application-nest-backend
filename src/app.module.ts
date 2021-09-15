import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photo } from './photos/photo.entity';
import { User } from './users/user.entity';
import { PhotosModule } from './photos/photos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test-application-nest',
      // entities: [User, Photo],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    PhotosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
