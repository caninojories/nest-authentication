import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

interface Role {
  id: number;
  name: string;
  description?: string;
}

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super('jwt');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return (super.canActivate(context) as Promise<boolean>).then(() => {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!roles || !user.roles) {
        throw new UnauthorizedException();
      }

      const hasRole = () =>
        user.roles.some((role: Role) =>
          roles.includes(role.name.toLowerCase())
        );

      return Promise.resolve(user && user.roles && hasRole());
    });
  }
}
