import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
//Use this guard in other modules where you want to protect routes. For example:

//typescript
//Copy code
//import { Controller, Get, UseGuards } from '@nestjs/common';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';

//@Controller('protected')
//export class ProtectedController {
 // @UseGuards(JwtAuthGuard)
 // @Get()
 // getProtectedData() {
  //  return { message: 'This is a protected route' };
 // }
//}