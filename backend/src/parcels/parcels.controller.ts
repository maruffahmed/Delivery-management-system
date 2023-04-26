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
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateParcelDto } from './dto/parcels.dto';
import { ParcelShopGuard } from './guard/parcelShop.guard';
import { ParcelsService } from './parcels.service';

@Controller('parcels')
export class ParcelsController {
  constructor(private parcelsService: ParcelsService) {}

  // GET /parcels
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

  // GET /parcels/all
  @Get('all')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async allParcel(
    @Query('pickup', new DefaultValuePipe(false), ParseBoolPipe)
    pickup: boolean,
    @Query('shop', new DefaultValuePipe(false), ParseBoolPipe)
    shop: boolean,
    @Query('deliveryArea', new DefaultValuePipe(false), ParseBoolPipe)
    deliveryArea: boolean,
    @Query('parcelUser', new DefaultValuePipe(false), ParseBoolPipe)
    parcelUser: boolean,
  ) {
    const parcels = await this.parcelsService.parcels(
      {},
      {
        include: {
          parcelPickUp: pickup,
          shop,
          parcelUser: parcelUser,
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
      ParcelTimeline: {
        create: {
          message: 'Parcel Created',
          parcelStatusId: parcelStatusId,
        },
      },
    });

    return {
      data: newParcel,
    };
  }

  // GET /parcels/pricing
  @Get('pricing')
  async parcelPricing(
    @Query('district', new DefaultValuePipe(false), ParseBoolPipe)
    district: boolean,
  ) {
    const prices = await this.parcelsService.parcelPricing(
      {},
      {
        include: {
          areas: {
            include: {
              district,
            },
          },
          pricing: true,
        },
      },
    );
    return { data: prices };
  }
}
