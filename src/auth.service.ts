import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USERS_SERVICE } from './constants';
import {
  UsersService
} from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === pass) {
      delete user.password;

      return user;
    }

    return null;
  }

  async login(user: any): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
