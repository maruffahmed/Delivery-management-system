import { Module } from '@nestjs/common';
import { ShopProductCategoriesService } from './shop-product-categories.service';
import { ShopProductCategoriesController } from './shop-product-categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ShopProductCategoriesService, PrismaService],
  controllers: [ShopProductCategoriesController],
  exports: [ShopProductCategoriesService],
})
export class ShopProductCategoriesModule {}
