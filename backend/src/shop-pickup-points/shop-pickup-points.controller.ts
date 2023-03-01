import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Param,
  Get,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { PickUpPoints } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserShopGuard } from 'src/shops/guard/userShop.guard';
import {
  CreatePickUpPointsDto,
  UpdatePickUpPointsDto,
} from './dto/pickUpPoints.dto';
import { ShopPickupPointsService } from './shop-pickup-points.service';

@Controller('shops')
export class ShopPickupPointsController {
  constructor(private shopPickupPointsService: ShopPickupPointsService) {}

  // GET /shops/1/pickup-points
  @Get(':shopId/pickup-points')
  @UseGuards(JwtAuthGuard, UserShopGuard)
  async getPickUpPoints(
    @Param('shopId', ParseIntPipe) shopId: number,
  ): Promise<{ data: PickUpPoints[] }> {
    const pickupPoints = await this.shopPickupPointsService.pickUpPoints({
      where: {
        shopsId: shopId,
      },
    });
    return { data: pickupPoints };
  }

  // GET /shops/1/pickup-points/1
  @Get(':shopId/pickup-points/:pickupPointId')
  @UseGuards(JwtAuthGuard, UserShopGuard)
  async getPickUpPoint(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('pickupPointId', ParseIntPipe) id: number,
  ): Promise<PickUpPoints> {
    return this.shopPickupPointsService.pickUpPoint(shopId, { id });
  }

  // POST /shops/1/pickup-points
  @Post(':shopId/pickup-points')
  @UseGuards(JwtAuthGuard, UserShopGuard)
  async createPickUpPoints(
    @Body(ValidationPipe) createPickUpPointsDto: CreatePickUpPointsDto,
    @Param('shopId', ParseIntPipe) shopId: number,
  ): Promise<PickUpPoints> {
    return this.shopPickupPointsService.createPickUpPoint(
      {
        ...createPickUpPointsDto,
        shops: {
          connect: {
            id: shopId,
          },
        },
      },
      {
        include: {
          shops: true,
        },
      },
    );
  }

  // Patch /shops/1/pickup-points/1
  @Patch(':shopId/pickup-points/:pickupPointId')
  @UseGuards(JwtAuthGuard, UserShopGuard)
  async updatePickUpPoints(
    @Body(ValidationPipe) updatePickUpPointsDto: UpdatePickUpPointsDto,
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('pickupPointId', ParseIntPipe) pickupPointId: number,
  ): Promise<PickUpPoints> {
    return this.shopPickupPointsService.updatePickUpPoint(
      shopId,
      {
        where: {
          id: pickupPointId,
        },
        data: updatePickUpPointsDto,
      },
      {
        include: {
          shops: true,
        },
      },
    );
  }
}
