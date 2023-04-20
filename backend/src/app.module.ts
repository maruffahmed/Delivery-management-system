import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { RolesModule } from './roles/roles.module';
import { ShopsModule } from './shops/shops.module';
import { ShopPickupPointsModule } from './shop-pickup-points/shop-pickup-points.module';
import { ShopProductCategoriesModule } from './shop-product-categories/shop-product-categories.module';
import { ServiceAreaModule } from './service-area/service-area.module';
import { ParcelsModule } from './parcels/parcels.module';
import { ChangePasswordModule } from './change-password/change-password.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    ShopsModule,
    ShopPickupPointsModule,
    ShopProductCategoriesModule,
    ServiceAreaModule,
    ParcelsModule,
    ChangePasswordModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
