import { Test, TestingModule } from '@nestjs/testing';
import { ParcelTimelineController } from './parcel-timeline.controller';

describe('ParcelTimelineController', () => {
  let controller: ParcelTimelineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcelTimelineController],
    }).compile();

    controller = module.get<ParcelTimelineController>(ParcelTimelineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
