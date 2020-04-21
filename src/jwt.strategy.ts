import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_SECRET_OR_KEY } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH_SECRET_OR_KEY) secretOrKey: string | Buffer) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretOrKey,
    });
  }

  async validate(payload: any) {
    return { _id: payload.sub, username: payload.username };
  }
}
