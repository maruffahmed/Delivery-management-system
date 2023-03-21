import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParcelsController } from './parcels.controller';
import { ParcelsService } from './parcels.service';

@Module({
  controllers: [ParcelsController],
  providers: [ParcelsService, PrismaService],
})
export class ParcelsModule {}
