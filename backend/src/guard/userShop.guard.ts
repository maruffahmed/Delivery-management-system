import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserShopGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const { id: shopId } = params;
    const shop = await this.prisma.shops.findUnique({
      where: { id: parseInt(shopId) },
    });
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }
    if (shop && user.id !== shop.userId) {
      throw new ForbiddenException("You don't have access to this shop");
    }
    return true;
  }
}
