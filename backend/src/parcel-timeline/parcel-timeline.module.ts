import { Module } from '@nestjs/common';
import { ParcelTimelineService } from './parcel-timeline.service';
import { ParcelTimelineController } from './parcel-timeline.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParcelsService } from 'src/parcels/parcels.service';

@Module({
  providers: [ParcelTimelineService, PrismaService, ParcelsService],
  controllers: [ParcelTimelineController],
})
export class ParcelTimelineModule {}
