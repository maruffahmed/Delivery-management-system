import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { RolesModule } from 'src/roles/roles.module';
import { ShopsModule } from 'src/shops/shops.module';
import { ShopPickupPointsModule } from 'src/shop-pickup-points/shop-pickup-points.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    ShopsModule,
    ShopPickupPointsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '604800s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
