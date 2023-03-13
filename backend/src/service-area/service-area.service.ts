import { Injectable } from '@nestjs/common';
import { Divisions, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceAreaService {
  constructor(private prisma: PrismaService) {}

  // return all product parent categories
  async divisions(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.DivisionsWhereUniqueInput;
      where?: Prisma.DivisionsWhereInput;
      orderBy?: Prisma.DivisionsOrderByWithRelationInput;
    },
    options?: Prisma.DivisionsArgs,
  ): Promise<Divisions[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.divisions.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      ...options,
    });
  }
}
