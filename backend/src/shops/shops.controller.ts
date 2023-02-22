import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Request,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { Shops } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserShopGuard } from 'src/shops/guard/userShop.guard';
import { CreateShopsDto, UpdateShopsDto } from './dto/shops.dto';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  // GET /shops
  @Get()
  @UseGuards(JwtAuthGuard)
  async getShops(@Request() req): Promise<{ data: Shops[] }> {
    const shops = await this.shopsService.shops({
      where: {
        userId: req.user.id,
      },
    });
    return { data: shops };
  }

  // GET /shops/1
  @Get(':shopId')
  @UseGuards(JwtAuthGuard, UserShopGuard)
  async getShop(@Param('shopId', ParseIntPipe) id: number): Promise<Shops> {
    return this.shopsService.shop({ id });
  }

  // POST /shops
  @Post()
  @UseGuards(JwtAuthGuard)
  async createShop(
    @Body(ValidationPipe) createShopDto: CreateShopsDto,
    @Request() req,
  ): Promise<Shops> {
    return this.shopsService.createShop({
      ...createShopDto,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    });
  }

  // PATCH /shops/1
  @Patch(':shopId')
  @UseGuards(JwtAuthGuard, UserShopGuard)
  async updateShop(
    @Param('shopId', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateShopDto: UpdateShopsDto,
  ): Promise<Shops> {
    return this.shopsService.updateShop({
      where: { id },
      data: updateShopDto,
    });
  }
}
