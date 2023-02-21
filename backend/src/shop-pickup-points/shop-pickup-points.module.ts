import { Module } from '@nestjs/common';
import { ShopPickupPointsService } from './shop-pickup-points.service';
import { ShopPickupPointsController } from './shop-pickup-points.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ShopPickupPointsService, PrismaService],
  controllers: [ShopPickupPointsController],
  exports: [ShopPickupPointsService],
})
export class ShopPickupPointsModule {}
