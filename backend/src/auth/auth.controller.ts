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

  // POST /auth/merchant/login
  @UseGuards(LocalAuthGuard)
  @Post('merchant/login')
  async merchantLogin(@Request() req) {
    return this.authService.merchantLogin(req.user);
  }

  // POST /auth/merchant/register
  @Post('merchant/register')
  async merchantRegister(@Body(ValidationPipe) registerDto: CreateUserDto) {
    return this.authService.merchantRegister(registerDto);
  }

  // POST /auth/admin/login
  @UseGuards(LocalAuthGuard)
  @Post('admin/login')
  async adminLogin(@Request() req) {
    return this.authService.adminLogin(req.user);
  }

  // POST /auth/packageHandler/login
  @UseGuards(LocalAuthGuard)
  @Post('packageHandler/login')
  async packagehandlerLogin(@Request() req) {
    return this.authService.packageHandlerLogin(req.user);
  }
}
