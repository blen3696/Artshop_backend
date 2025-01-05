import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    Logger.log('JwtAuthGuard - Activated');
    return super.canActivate(context);
  }

handleRequest(err: any, user: any, info: any): any {
    if (err || !user) {
        Logger.error('JwtAuthGuard - User validation failed', err || info);
        throw err || new UnauthorizedException('Unauthorized');
    }
    Logger.log('JwtAuthGuard - User validated:', user);
    return user;
}
}