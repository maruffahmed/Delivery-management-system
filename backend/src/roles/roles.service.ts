import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async createRoleDetails(data: Prisma.RoleDescriptionCreateInput) {
    return this.prismaService.roleDescription.create({
      data,
    });
  }

  async roleDetail(
    roleDescriptionWhereUniqueInput: Prisma.RoleDescriptionWhereUniqueInput,
  ) {
    return this.prismaService.roleDescription.findUnique({
      where: roleDescriptionWhereUniqueInput,
    });
  }

  async createRole(data: Prisma.RolesCreateInput) {
    return this.prismaService.roles.create({
      data,
    });
  }
}
