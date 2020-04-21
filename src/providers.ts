import { Provider } from '@nestjs/common';
import { AUTH_SECRET_OR_KEY, USERS_SERVICE } from './constants';

export function createAuthOptionProvider(
  secretOrKey: string | Buffer | undefined,
): Provider {
  return {
    provide: AUTH_SECRET_OR_KEY,
    useValue: secretOrKey,
  };
}

export function createUsersService(UsersService: any): Provider {
  return {
    provide: USERS_SERVICE,
    useClass: UsersService,
  };
}
