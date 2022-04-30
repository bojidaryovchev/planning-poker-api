import * as Iron from '@hapi/iron';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUserPayload } from '../interfaces/jwtUserPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUserPayload> {
    return {
      userId: await Iron.unseal(payload.sub, process.env.USER_ID_SEAL_SECRET, Iron.defaults),
    };
  }
}
