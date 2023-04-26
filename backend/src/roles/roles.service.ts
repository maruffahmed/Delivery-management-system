import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  // Get all role details
  async roleDetails(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.RoleDescriptionWhereUniqueInput;
      where?: Prisma.RoleDescriptionWhereInput;
      orderBy?: Prisma.RoleDescriptionOrderByWithRelationInput;
    },
    options?: Prisma.RoleDescriptionArgs,
  ) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.roleDescription.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      ...options,
    });
  }

  // Get single role details
  async roleDetail(
    roleDescriptionWhereUniqueInput: Prisma.RoleDescriptionWhereUniqueInput,
  ) {
    return this.prismaService.roleDescription.findUnique({
      where: roleDescriptionWhereUniqueInput,
    });
  }

  // create role details
  async createRoleDetails(data: Prisma.RoleDescriptionCreateInput) {
    return this.prismaService.roleDescription.create({
      data,
    });
  }

  // create role
  async createRole(data: Prisma.RolesCreateInput) {
    return this.prismaService.roles.create({
      data,
    });
  }
}
