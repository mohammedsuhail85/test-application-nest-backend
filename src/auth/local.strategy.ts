import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private authService: AuthService
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {

    // Validating user
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    // creating the user property on the Request object
    return user;
  }
}