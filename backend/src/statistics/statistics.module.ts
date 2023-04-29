import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ShopsService } from 'src/shops/shops.service';
import { ParcelsService } from 'src/parcels/parcels.service';

@Module({
  providers: [
    StatisticsService,
    PrismaService,
    UsersService,
    ShopsService,
    ParcelsService,
  ],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
