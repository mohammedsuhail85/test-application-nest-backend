import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: jwtConstants.secret
    })
  }

  /* 
  * Here the validate method called after the JwtStrategy and decodes the token.
  * Payload is a decoded object which is in the Jwt token. Here we can also make a call to 
  * DB to get other properties as well. 
  */
  async validate(payload: any) {
    return {
      ...payload,
      userId: 1234

    }
  }
}