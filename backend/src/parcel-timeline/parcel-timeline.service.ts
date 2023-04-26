import { Injectable } from '@nestjs/common';
import { ParcelTimeline, Prisma } from '@prisma/client';
import { ParcelsService } from 'src/parcels/parcels.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParcelTimelineService {
  constructor(
    private prisma: PrismaService,
    private parcelsService: ParcelsService,
  ) {}

  // get parcel timeline by parcel id
  async parcelTimeline(
    parcelWhereUniqueInput: Prisma.ParcelWhereUniqueInput,
    options?: Prisma.ParcelArgs,
  ) {
    return this.parcelsService.parcel(parcelWhereUniqueInput, {
      ...options,
    });
  }

  // create new shop
  async addNewTimeline(
    data: Prisma.ParcelTimelineCreateInput,
  ): Promise<ParcelTimeline> {
    return this.prisma.parcelTimeline.create({
      data,
    });
  }
}
