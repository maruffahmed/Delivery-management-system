import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ParcelTimelineService } from './parcel-timeline.service';

@Controller('parcel-timeline')
export class ParcelTimelineController {
  constructor(private parcelTimelineService: ParcelTimelineService) {}

  //   GET /parcel-timeline
  @Get('/:parcelNumber')
  async parcelTimeline(@Param('parcelNumber') parcelNumber: string) {
    const parcelTimeline = await this.parcelTimelineService.parcelTimeline(
      { parcelNumber },
      {
        select: {
          id: true,
          parcelNumber: true,
          customerName: true,
          createdAt: true,
          updatedAt: true,
          parcelDeliveryArea: true,
          ParcelTimeline: {
            include: {
              parcelStatus: true,
            },
          },
        },
      },
    );
    if (!parcelTimeline) {
      throw new NotFoundException("Parcel timeline doesn't exist");
    }
    return parcelTimeline;
  }
}
