import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    Logger.log('RolesGuard - User:', request.user);

    if (!request.user) {
      Logger.error('RolesGuard - No user object attached to the request');
      return false;
    }

    return requiredRoles.some((role) => request.user.roles.includes(role));
  }
}