import { Test, TestingModule } from '@nestjs/testing';
import { ShopProductCategoriesController } from './shop-product-categories.controller';

describe('ShopProductCategoriesController', () => {
  let controller: ShopProductCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopProductCategoriesController],
    }).compile();

    controller = module.get<ShopProductCategoriesController>(
      ShopProductCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
