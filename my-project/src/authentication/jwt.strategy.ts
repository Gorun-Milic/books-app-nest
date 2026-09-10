import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type AuthUser = {
  userId: string;
  email: string;
  name: string;
};

type JwtPayload = {
  sub: string;
  email: string;
  name: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'development-secret',
    });
  }

  validate(payload: JwtPayload): AuthUser {
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}
