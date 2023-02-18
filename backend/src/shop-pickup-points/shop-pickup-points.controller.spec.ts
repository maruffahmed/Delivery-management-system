import { Test, TestingModule } from '@nestjs/testing';
import { ShopPickupPointsController } from './shop-pickup-points.controller';

describe('ShopPickupPointsController', () => {
  let controller: ShopPickupPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopPickupPointsController],
    }).compile();

    controller = module.get<ShopPickupPointsController>(
      ShopPickupPointsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
