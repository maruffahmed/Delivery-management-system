import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [AuthModule, UsersModule, RolesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
