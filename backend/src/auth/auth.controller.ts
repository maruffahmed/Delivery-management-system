import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('merchant/login')
  async login(@Request() req) {
    return this.authService.merchantLogin(req.user);
  }

  @Post('merchant/register')
  async merchantRegister(@Body(ValidationPipe) registerDto: CreateUserDto) {
    return this.authService.merchantRegister(registerDto);
  }
}
