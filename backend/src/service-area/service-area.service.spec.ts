import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAreaService } from './service-area.service';

describe('ServiceAreaService', () => {
  let service: ServiceAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceAreaService],
    }).compile();

    service = module.get<ServiceAreaService>(ServiceAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
