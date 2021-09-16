import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    const body: CreateUserDto = req.body;

    switch (req.method) {
      case "POST":
        if (!body.firstName || !body.lastName) {
          res.status(401).send({ message: 'firstName and lastName are required' })
        } else if (!body.password) {
          res.status(401).send({ message: 'password is required' })
        } else {
          next();
        }
        break;
      case "PUT" || "DELETE":
        if (!req.params.id) {
          res.status(401).send({ message: 'userId is required' })
        } else {
          next();
        }
        break;
      default:
        next()
        break;
    }

  }
}
