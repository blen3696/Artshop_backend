import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthorizationService, JwtStrategy, RolesGuard],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}

