import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common/exceptions';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { ShopsService } from 'src/shops/shops.service';
import { ShopPickupPointsService } from 'src/shop-pickup-points/shop-pickup-points.service';
import { UserWithRolesDetails } from './types/auth.types';

@Injectable()
export class AuthService {
  readonly saltRounds = process.env.BCRYPT_SALT_OR_ROUNDS;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
    private shopsService: ShopsService,
    private shopPickupPointsService: ShopPickupPointsService,
  ) {}

  // Validate user with username(Email) and password
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

  // Login user and return access token
  async merchantLogin(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    try {
      const user = (await this.usersService.user(
        {
          id: payload.sub,
        },
        {
          include: {
            roles: {
              include: {
                role: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      )) as UserWithRolesDetails;
      const isMerchant = user.roles.some(
        (role) => role.role.name === 'merchant',
      );

      if (!isMerchant) {
        throw new BadRequestException('User is not a merchant');
      }
      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  // Create new merchant with a new shop and pickup point
  async merchantRegister(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      const { name, email, phone, password } = data;
      // Encrypt the password
      const hash = await bcrypt.hash(password, parseInt(this.saltRounds));

      // Create new user
      const _user = await this.usersService.createUser({
        name,
        email,
        phone,
        password: hash,
      });

      // Find the metchant role by name
      const role = await this.rolesService.roleDetail({
        name: 'merchant',
      });

      // Create a merchant role for the new user
      await this.rolesService.createRole({
        user: { connect: { id: _user.id } },
        role: {
          connect: {
            id: role.id,
          },
        },
      });

      // TODO : Create a new shop
      const {
        shopName,
        shopAddress,
        shopEmail,
        shopProductType,
        shopSubProductType,
      } = data;
      const _shop = await this.shopsService.createShop({
        name: shopName,
        email: shopEmail,
        address: shopAddress,
        productType: shopProductType,
        productSubType: shopSubProductType,
        user: {
          connect: {
            id: _user.id,
          },
        },
      });
      // TODO : Create a new shop pickup point
      const { pickupAddress, pickupArea, pickupPhone } = data;
      await this.shopPickupPointsService.createPickUpPoint({
        name: pickupAddress,
        address: pickupAddress,
        area: pickupArea,
        phone: pickupPhone,
        isActive: true,
        shops: {
          connect: {
            id: _shop.id,
          },
        },
      });

      // Find the created user and return without the password
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
            shops: true,
          },
        },
      );
      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          throw new ConflictException('User email address already exist');
        }
      }
      if (e instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(e.message);
      }
      // console.log('error ', e);
    }
  }
}
