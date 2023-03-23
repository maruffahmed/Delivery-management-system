import { Injectable } from '@nestjs/common';
import { Parcel, Prisma, Zones } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParcelsService {
  constructor(private prisma: PrismaService) {}

  // Get a single parcel
  async parcel(
    userWhereUniqueInput: Prisma.ParcelWhereUniqueInput,
    options?: Prisma.ParcelArgs,
  ): Promise<Parcel | null> {
    return this.prisma.parcel.findUnique({
      where: userWhereUniqueInput,
      ...options,
    });
  }

  // Get all parcels
  async parcels(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ParcelWhereUniqueInput;
      where?: Prisma.ParcelWhereInput;
      orderBy?: Prisma.ParcelOrderByWithRelationInput;
    },
    options?: Prisma.ParcelArgs,
  ): Promise<Parcel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.parcel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      ...options,
    });
  }

  // Create a single parcel
  async createParcel(data: Prisma.ParcelCreateInput): Promise<Parcel> {
    return this.prisma.parcel.create({
      data,
    });
  }

  // Update a single parcel
  async updateParcel(params: {
    where: Prisma.ParcelWhereUniqueInput;
    data: Prisma.ParcelUpdateInput;
  }): Promise<Parcel> {
    const { where, data } = params;
    return this.prisma.parcel.update({
      data,
      where,
    });
  }

  // Delete a single parcel
  async deleteUser(where: Prisma.ParcelWhereUniqueInput): Promise<Parcel> {
    return this.prisma.parcel.delete({
      where,
    });
  }

  // Get parcel pricing
  async parcelPricing(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ZonesWhereUniqueInput;
      where?: Prisma.ZonesWhereInput;
      orderBy?: Prisma.ZonesOrderByWithRelationInput;
    },
    options?: Prisma.ZonesArgs,
  ): Promise<Zones[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.zones.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      ...options,
    });
  }
}
