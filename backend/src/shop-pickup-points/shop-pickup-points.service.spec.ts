import { Test, TestingModule } from '@nestjs/testing';
import { ShopPickupPointsService } from './shop-pickup-points.service';

describe('ShopPickupPointsService', () => {
  let service: ShopPickupPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopPickupPointsService],
    }).compile();

    service = module.get<ShopPickupPointsService>(ShopPickupPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
