import { Test, TestingModule } from '@nestjs/testing';
import { ParcelTimelineService } from './parcel-timeline.service';

describe('ParcelTimelineService', () => {
  let service: ParcelTimelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelTimelineService],
    }).compile();

    service = module.get<ParcelTimelineService>(ParcelTimelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
