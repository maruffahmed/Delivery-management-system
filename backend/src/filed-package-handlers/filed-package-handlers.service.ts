import { Injectable, BadRequestException } from '@nestjs/common';
import { FieldPackageHandler, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from 'src/roles/roles.service';
import {
  CreateFieldPackageHandlerDto,
  UpdateFieldPackageHandlerDto,
} from './dto/packageHandlers.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class FiledPackageHandlersService {
  readonly saltRounds = process.env.BCRYPT_SALT_OR_ROUNDS;
  constructor(
    private prisma: PrismaService,
    private rolesService: RolesService,
    private usersService: UsersService,
  ) {}

  // Add new field package handler
  async createFieldPackageHandler(
    data: CreateFieldPackageHandlerDto,
  ): Promise<Omit<User, 'password'>> {
    try {
      const { address, areaId, name, email, password, phone, roleId } = data;

      // Encrypt the password
      const hash = await bcrypt.hash(password, parseInt(this.saltRounds));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: pass, ...user } = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          phone,
          roles: {
            create: {
              roleDescriptionId: roleId,
            },
          },
          fieldPackageHandler: {
            create: {
              address,
              area: {
                connect: {
                  id: areaId,
                },
              },
            },
          },
        },
      });
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

  // Get a single field package handlers
  async fieldPackageHandler(
    shopsWhereUniqueInput: Prisma.FieldPackageHandlerWhereUniqueInput,
    options?: Prisma.FieldPackageHandlerArgs,
  ): Promise<FieldPackageHandler | null> {
    const fieldPackagehandler =
      await this.prisma.fieldPackageHandler.findUnique({
        where: shopsWhereUniqueInput,
        ...options,
      });
    if (!fieldPackagehandler) {
      throw new NotFoundException('Field package handler not found.');
    }
    return fieldPackagehandler;
  }

  // Get all field package handlers
  async fieldPackageHandlers(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.FieldPackageHandlerWhereUniqueInput;
      where?: Prisma.FieldPackageHandlerWhereInput;
      orderBy?: Prisma.FieldPackageHandlerOrderByWithRelationInput;
    },
    options?: Prisma.FieldPackageHandlerArgs,
  ): Promise<FieldPackageHandler[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.fieldPackageHandler.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      ...options,
    });
  }

  // Update a field package handler
  async updateFieldPackageHandler(params: {
    where: Prisma.FieldPackageHandlerWhereUniqueInput;
    data: UpdateFieldPackageHandlerDto;
  }): Promise<Omit<User, 'password'>> {
    try {
      const { where, data } = params;
      const { password, address, areaId, name, email, phone, roleId } = data;
      // Encrypt the password

      let hash: string;
      if (password) {
        hash = await bcrypt.hash(password, parseInt(this.saltRounds));
      }

      const updateFieldPackageHandler =
        await this.prisma.fieldPackageHandler.update({
          where,
          data: {
            address,
            areaId,
          },
          include: {
            User: {
              include: {
                roles: true,
              },
            },
          },
        });
      console.log('updateFieldPackageHandler ', updateFieldPackageHandler);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: pass, ...user } = await this.prisma.user.update({
        where: {
          id: updateFieldPackageHandler.User.id,
        },
        data: {
          name,
          email,
          phone,
          password: hash,
          roles: {
            update: {
              where: {
                id: updateFieldPackageHandler.User.roles[0].id,
              },
              data: {
                roleDescriptionId: roleId,
              },
            },
          },
        },
      });

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
      throw new BadRequestException(e.message);
    }
  }
}
