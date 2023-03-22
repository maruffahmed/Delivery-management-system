import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParcelShopGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, body } = context.switchToHttp().getRequest();
    const { shopsId, parcelPickUpId } = body;
    // console.log('Body ', shopsId);
    // find shop by id
    const shop = await this.prisma.shops.findUnique({
      where: { id: parseInt(shopsId) },
    });
    // if shop not found throw not found exception
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }
    // if shop found and user id not equal to shop user id throw forbidden exception
    if (user.id !== shop.userId) {
      throw new ForbiddenException("You don't have access to this shop");
    }

    // find parcel pickup point by id
    const parcelPickUp = await this.prisma.pickUpPoints.findUnique({
      where: { id: parseInt(parcelPickUpId) },
    });

    // if parcel pickup point not found throw not found exception
    if (!parcelPickUp) {
      throw new NotFoundException('Parcel pickup point not found');
    }
    // if parcel pickup point found and shop id not equal to parcel pickup point shop id throw forbidden exception
    if (shopsId !== parcelPickUp.shopsId) {
      throw new ForbiddenException(
        "You don't have access to this parcel pickup point",
      );
    }

    // if shop found and user id equal to shop user id return true
    return true;
  }
}
