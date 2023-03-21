import { Test, TestingModule } from '@nestjs/testing';
import { ParcelsService } from './parcels.service';

describe('ParcelsService', () => {
  let service: ParcelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelsService],
    }).compile();

    service = module.get<ParcelsService>(ParcelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
