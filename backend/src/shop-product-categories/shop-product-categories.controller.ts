import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ShopProductCategoriesService } from './shop-product-categories.service';

@Controller('shop-product-categories')
export class ShopProductCategoriesController {
  constructor(
    private shopProductCategoriesService: ShopProductCategoriesService,
  ) {}

  // GET /shop-product-categories/parents
  @Get('/parent')
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
  async productChildCategories() {
    return this.shopProductCategoriesService.productChildCategories({});
  }

  // GET /shop-product-categories/parents
  @Get('/child/:parentId')
  async productChildCategoriesWhere(
    @Param('parentId', ParseIntPipe) parentId: number,
  ) {
    return this.shopProductCategoriesService.productChildCategoriesWhere({
      parentId,
    });
  }
}
