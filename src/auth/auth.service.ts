import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, candidatePassword: string): Promise<any> {

    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isValidPassword = await bcrypt.compare(String(candidatePassword), String(user.password));
    if (isValidPassword) {
      return new Promise(resolve => resolve(omit(user, ["password", "tempPassword"])));
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      email: user.email,
    }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
