import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { RolesModule } from './roles/roles.module';
import { ShopsModule } from './shops/shops.module';
import { ShopPickupPointsModule } from './shop-pickup-points/shop-pickup-points.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    ShopsModule,
    ShopPickupPointsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
