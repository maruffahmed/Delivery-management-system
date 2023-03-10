import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  ShopProductsChildCategories,
  ShopProductsParentCategories,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopProductCategoriesService {
  constructor(private prisma: PrismaService) {}

  // return all product parent categories
  async productParentCategories(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ShopProductsParentCategoriesWhereUniqueInput;
      where?: Prisma.ShopProductsParentCategoriesWhereInput;
      orderBy?: Prisma.ShopProductsParentCategoriesOrderByWithRelationInput;
    },
    options?: Prisma.ShopProductsParentCategoriesArgs,
  ): Promise<ShopProductsParentCategories[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shopProductsParentCategories.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      ...options,
    });
  }

  // return all product child categories
  async productChildCategories(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ShopProductsChildCategoriesWhereUniqueInput;
      where?: Prisma.ShopProductsChildCategoriesWhereInput;
      orderBy?: Prisma.ShopProductsChildCategoriesOrderByWithRelationInput;
    },
    options?: Prisma.ShopProductsChildCategoriesArgs,
  ): Promise<ShopProductsChildCategories[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shopProductsChildCategories.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      ...options,
    });
  }

  // return a product child category by parent category id
  async productChildCategoriesWhere(
    shopProductsChildCategoriesWhereInput: Prisma.ShopProductsChildCategoriesWhereInput,
    options?: Prisma.ShopProductsChildCategoriesArgs,
  ): Promise<ShopProductsChildCategories[] | null> {
    const shopProductsChildCategories =
      await this.prisma.shopProductsChildCategories.findMany({
        where: shopProductsChildCategoriesWhereInput,
        ...options,
      });
    if (!shopProductsChildCategories) {
      throw new NotFoundException('Product child categories is not found');
    }
    return shopProductsChildCategories;
  }
}
