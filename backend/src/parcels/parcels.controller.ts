import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { FiledPackageHandlersService } from 'src/filed-package-handlers/filed-package-handlers.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateParcelDto, UpdateParcelDto } from './dto/parcels.dto';
import { ParcelShopGuard } from './guard/parcelShop.guard';
import { ParcelsService } from './parcels.service';

@Controller('parcels')
export class ParcelsController {
  constructor(
    private parcelsService: ParcelsService,
    private filedPackageHandlersService: FiledPackageHandlersService,
  ) {}

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

  // GET /parcels/1
  @Get(':parcelNumber')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async parcelByNumber(
    @Query('pickup', new DefaultValuePipe(false), ParseBoolPipe)
    pickup: boolean,
    @Query('shop', new DefaultValuePipe(false), ParseBoolPipe)
    shop: boolean,
    @Query('deliveryArea', new DefaultValuePipe(false), ParseBoolPipe)
    deliveryArea: boolean,
    @Query('parcelUser', new DefaultValuePipe(false), ParseBoolPipe)
    parcelUser: boolean,
    @Param('parcelNumber') parcelNumber: string,
  ) {
    const parcels = await this.parcelsService.parcel(
      { parcelNumber },
      {
        include: {
          parcelPickUp: pickup,
          shop,
          parcelUser,
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

    if (!parcels) {
      throw new NotFoundException(
        `Parcel with number ${parcelNumber} not found`,
      );
    }

    return parcels;
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

  // PATCH /parcels/1
  @Patch(':parcelNumber')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateParcel(
    @Param('parcelNumber') parcelNumber: string,
    @Body(ValidationPipe) updateParcelDto: UpdateParcelDto,
  ) {
    try {
      const updatedParcel = await this.parcelsService.updateParcel({
        where: {
          parcelNumber,
        },
        data: updateParcelDto,
      });
      return updatedParcel;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async assignParcelFieldPackageHandler(
    @Query('parcelNumber') parcelNumber: string,
    @Query('handlerType') handlerType: string,
    @Query('handlerId', ParseIntPipe) handlerId: number,
  ) {
    try {
      const handlerInfo: any =
        await this.filedPackageHandlersService.fieldPackageHandler(
          {
            id: handlerId,
          },
          {
            include: {
              User: true,
            },
          },
        );
      const message =
        handlerType === 'deliveryman'
          ? `Delivery Agent ${handlerInfo?.User?.name}(${handlerInfo?.User?.phone}) is out for delivery`
          : 'Parcel assigned to a pickupman';
      const result = await this.parcelsService.updateParcel({
        where: {
          parcelNumber,
        },
        data: {
          FieldPackageHandler: {
            connect: {
              id: handlerId,
            },
          },
          ParcelTimeline: {
            create: {
              message,
              parcelStatus: {
                connect: {
                  name:
                    handlerType === 'deliveryman'
                      ? 'in-transit'
                      : handlerType === 'pickupman'
                      ? 'picking-up'
                      : 'pending',
                },
              },
            },
          },
          parcelStatus: {
            connect: {
              name:
                handlerType === 'deliveryman'
                  ? 'in-transit'
                  : handlerType === 'pickupman'
                  ? 'picking-up'
                  : 'pending',
            },
          },
        },
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
