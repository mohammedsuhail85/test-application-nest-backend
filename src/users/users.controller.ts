import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUset(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() input: CreateUserDto): Promise<User> {
    return this.usersService.createUser(input);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
