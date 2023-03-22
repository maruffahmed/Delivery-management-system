import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseBoolPipe,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateParcelDto } from './dto/parcels.dto';
import { ParcelShopGuard } from './guard/parcelShop.guard';
import { ParcelsService } from './parcels.service';

@Controller('parcels')
export class ParcelsController {
  constructor(private parcelsService: ParcelsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async parcel(
    @Request() req,
    @Query('pickup', new DefaultValuePipe(false), ParseBoolPipe)
    pickup: boolean,
    @Query('shop', new DefaultValuePipe(false), ParseBoolPipe)
    shop: boolean,
    @Query('deliveryArea', new DefaultValuePipe(false), ParseBoolPipe)
    deliveryArea: boolean,
  ) {
    const parcels = await this.parcelsService.parcels(
      {
        where: {
          parcelUserId: req.user.id,
        },
      },
      {
        include: {
          parcelPickUp: pickup,
          shop,
          parcelDeliveryArea: deliveryArea && {
            include: {
              district: {
                include: {
                  division: deliveryArea,
                },
              },
            },
          },
          parcelStatus: true,
        },
      },
    );

    return { data: parcels };
  }

  // POST /parcels
  @Post()
  @UseGuards(JwtAuthGuard, ParcelShopGuard)
  async createParcel(
    @Request() req,
    @Body(ValidationPipe) createParcelDto: CreateParcelDto,
  ) {
    // extract input data
    const {
      parcelProductCategoriesId,
      shopsId,
      parcelPickUpId,
      parcelStatusId,
      parcelDeliveryAreaId,
      ...restBody
    } = createParcelDto;
    // extract user id from request
    const parcelUserId = req.user.id;
    // create parcel
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
