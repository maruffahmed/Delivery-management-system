import { Injectable } from '@nestjs/common';
import { ParcelsService } from 'src/parcels/parcels.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShopsService } from 'src/shops/shops.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private shopsService: ShopsService,
    private parcelsService: ParcelsService,
  ) {}
  async adminStatistics() {
    const merchants = await this.usersService.users({
      where: {
        roles: {
          some: {
            role: {
              name: 'merchant',
            },
          },
        },
      },
    });

    const shops = await this.shopsService.shops({});
    const parcels = await this.parcelsService.parcels({});
    const pendingParcels = await this.parcelsService.parcels({
      where: {
        parcelStatus: {
          name: 'pending',
        },
      },
    });

    const statistics = {
      merchants: merchants.length,
      shops: shops.length,
      parcels: parcels.length,
      pendingParcels: pendingParcels.length,
    };

    return statistics;
  }
}
