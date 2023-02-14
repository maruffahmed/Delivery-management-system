import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // console.log(requiredRoles);
    const { user } = context.switchToHttp().getRequest();
    // console.log(user.roles);
    return validateRole(requiredRoles, user);
  }
}

const validateRole = (roles: Role[], user: any) => {
  return roles.some((role) =>
    user?.roles?.some(
      (userRole) => userRole.role.name.toLowerCase() == role.toLowerCase(),
    ),
  );
};
