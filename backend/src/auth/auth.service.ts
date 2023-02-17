import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  readonly saltRounds = process.env.BCRYPT_SALT_OR_ROUNDS;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ email });
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
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

  async merchantRegister(data: Prisma.UserCreateInput) {
    const { password } = data;
    // Encrypt the password
    const hash = await bcrypt.hash(password, parseInt(this.saltRounds));

    const _user = await this.usersService.createUser({
      ...data,
      password: hash,
    });

    const role = await this.rolesService.roleDetail({
      name: 'merchant',
    });

    await this.rolesService.createRole({
      user: { connect: { id: _user.id } },
      role: {
        connect: {
          id: role.id,
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...user } = await this.usersService.user(
      {
        id: _user.id,
      },
      {
        include: {
          roles: {
            select: {
              id: true,
              role: true,
            },
          },
        },
      },
    );

    return user;
  }
}
