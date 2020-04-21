import { Module, DynamicModule } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  createAuthOptionProvider,
  createUsersService,
} from './providers';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({})
export class AuthModule {
  static register(
    options: JwtModuleOptions,
    UsersModule: any,
    UsersService: any,
  ): DynamicModule {
    const optionProvider = createAuthOptionProvider(options.secret);
    const usersServiceProvider = createUsersService(UsersService);
    return {
      module: AuthModule,
      imports: [UsersModule, PassportModule, JwtModule.register(options)],
      providers: [
        optionProvider,
        usersServiceProvider,
        AuthService,
        LocalStrategy,
        JwtStrategy,
      ],
      exports: [AuthService],
      global: true,
    };
  }
}
