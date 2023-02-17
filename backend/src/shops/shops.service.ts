import { Injectable } from '@nestjs/common';
import { Prisma, Shops } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  async shop(
    shopsWhereUniqueInput: Prisma.ShopsWhereUniqueInput,
    options?: Prisma.ShopsArgs,
  ): Promise<Shops | null> {
    return this.prisma.shops.findUnique({
      where: shopsWhereUniqueInput,
      ...options,
    });
  }

  async shops(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ShopsWhereUniqueInput;
      where?: Prisma.ShopsWhereInput;
      orderBy?: Prisma.ShopsOrderByWithRelationInput;
    },
    options?: Prisma.ShopsArgs,
  ): Promise<Shops[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shops.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      ...options,
    });
  }

  async createShop(data: Prisma.ShopsCreateInput): Promise<Shops> {
    return this.prisma.shops.create({
      data,
    });
  }

  async updateShop(params: {
    where: Prisma.ShopsWhereUniqueInput;
    data: Prisma.ShopsUpdateInput;
  }): Promise<Shops> {
    const { where, data } = params;
    return this.prisma.shops.update({
      data,
      where,
    });
  }
}
