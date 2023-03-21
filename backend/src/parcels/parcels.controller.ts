import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserShopGuard } from 'src/shops/guard/userShop.guard';
import { CreateParcelDto } from './dto/parcels.dto';
import { ParcelsService } from './parcels.service';

@Controller('parcels')
export class ParcelsController {
  constructor(private parcelsService: ParcelsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async parcel() {
    return this.parcelsService.parcels({});
  }

  // POST /parcels
  @Post()
  @UseGuards(JwtAuthGuard)
  async createParcel(@Body(ValidationPipe) createParcelDto: CreateParcelDto) {
    const {
      parcelProductCategoriesId,
      shopsId,
      parcelUserId,
      parcelPickUpId,
      parcelStatusId,
      parcelDeliveryAreaId,
      ...restBody
    } = createParcelDto;
    const newParcel = await this.parcelsService.createParcel({
      ...restBody,
      parcelProductCategory: {
        connect: {
          id: parcelProductCategoriesId,
        },
      },
      shop: {
        connect: {
          id: shopsId,
        },
      },
      parcelUser: {
        connect: {
          id: parcelUserId,
        },
      },
      parcelPickUp: {
        connect: {
          id: parcelPickUpId,
        },
      },
      parcelStatus: {
        connect: {
          id: parcelStatusId,
        },
      },
      parcelDeliveryArea: {
        connect: {
          id: parcelDeliveryAreaId,
        },
      },
    });

    return {
      data: newParcel,
    };
  }
}
