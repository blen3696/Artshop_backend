import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userDto: UserDto) {
    return this.authService.register(userDto.username, userDto.password);
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    return this.authService.login(userDto.username, userDto.password);
  }
}

