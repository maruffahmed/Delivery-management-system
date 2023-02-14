import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService, PrismaService],
  exports: [RolesService],
})
export class RolesModule {}
