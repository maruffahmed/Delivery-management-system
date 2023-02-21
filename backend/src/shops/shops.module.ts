import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ShopsService, PrismaService],
  controllers: [ShopsController],
  exports: [ShopsService],
})
export class ShopsModule {}
