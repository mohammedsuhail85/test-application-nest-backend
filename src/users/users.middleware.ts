import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    const body: CreateUserDto = req.body;

    if (!body.firstName) {
      res.status(401).send({ message: 'firstName is required' })
    } else if (!body.lastName) {
      res.status(401).send({ message: 'lastName is required' })
    } else {
      next();
    }
  }
}
