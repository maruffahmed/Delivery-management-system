import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  providers: [RolesService, PrismaService],
  exports: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
