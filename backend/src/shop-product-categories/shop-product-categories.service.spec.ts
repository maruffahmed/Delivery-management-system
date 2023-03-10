import { Test, TestingModule } from '@nestjs/testing';
import { ShopProductCategoriesService } from './shop-product-categories.service';

describe('ShopProductCategoriesService', () => {
  let service: ShopProductCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopProductCategoriesService],
    }).compile();

    service = module.get<ShopProductCategoriesService>(
      ShopProductCategoriesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
