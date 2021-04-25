import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import UserEntity, { UserRole } from '../user/user.entity';
import { NoPermissionError } from '../commons/auth.exception';
import { log } from 'util';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if(requiredRoles){
      const user: UserEntity = context.switchToHttp().getRequest().user;
      const hasPermission = requiredRoles.some((role) => user.role == role);
      if (!hasPermission) {
        throw new NoPermissionError();
      }
    }

    return true;
  }
}
