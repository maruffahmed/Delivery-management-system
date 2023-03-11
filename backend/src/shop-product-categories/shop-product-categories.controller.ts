import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  UseGuards,
  DefaultValuePipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ShopProductCategoriesService } from './shop-product-categories.service';

@Controller('shop-product-categories')
export class ShopProductCategoriesController {
  constructor(
    private shopProductCategoriesService: ShopProductCategoriesService,
  ) {}

  // GET /shop-product-categories/parents
  @Get('/parent')
  @UseGuards(JwtAuthGuard)
  async productParentCategories(
    @Query('child', new DefaultValuePipe(false), ParseBoolPipe) child: boolean,
  ) {
    return this.shopProductCategoriesService.productParentCategories(
      {},
      {
        include: {
          childs: child,
        },
      },
    );
  }

  // GET /shop-product-categories/parents
  @Get('/child')
  @UseGuards(JwtAuthGuard)
  async productChildCategories() {
    return this.shopProductCategoriesService.productChildCategories({});
  }

  // GET /shop-product-categories/parents
  @Get('/child/:parentId')
  @UseGuards(JwtAuthGuard)
  async productChildCategoriesWhere(
    @Param('parentId', ParseIntPipe) parentId: number,
  ) {
    return this.shopProductCategoriesService.productChildCategoriesWhere({
      parentId,
    });
  }
}
