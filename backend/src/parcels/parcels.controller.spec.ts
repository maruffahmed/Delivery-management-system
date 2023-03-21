import { Test, TestingModule } from '@nestjs/testing';
import { ParcelsController } from './parcels.controller';

describe('ParcelsController', () => {
  let controller: ParcelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcelsController],
    }).compile();

    controller = module.get<ParcelsController>(ParcelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
