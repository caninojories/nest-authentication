import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { USERS_SERVICE } from './constants';
import { UsersService } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    let hashPassword: string;
    const user = await this.usersService.findByUsername(username);
    /**
     * Check if we have salt
     * so that we hash the password to get
     * the actual password
     */
    if (user && user.salt) {
      hashPassword = await this.hashPassword(user.password, user.salt);
      pass = hashPassword;
    }

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

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
