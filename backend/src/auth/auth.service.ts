import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ email });
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(user: Prisma.UserCreateInput) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = await this.usersService.createUser(user);
    return userInfo;
  }
}
