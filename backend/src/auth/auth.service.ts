import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  readonly saltRounds = process.env.BCRYPT_SALT_OR_ROUNDS;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.usersService.user({ email });
      if (!user) {
        throw new Error('Incorrect Username or Password');
      }

      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      } else {
        throw new Error('Incorrect Password');
      }
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
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

  async merchantRegister(
    data: Prisma.UserCreateInput,
  ): Promise<Omit<User, 'password'>> {
    try {
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
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          throw new ConflictException('Email address already exist');
        }
      }
      throw new BadRequestException();
    }
  }
}
