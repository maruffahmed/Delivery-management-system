import { Module } from '@nestjs/common';
import { ServiceAreaService } from './service-area.service';
import { ServiceAreaController } from './service-area.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ServiceAreaService, PrismaService],
  controllers: [ServiceAreaController],
  exports: [ServiceAreaService],
})
export class ServiceAreaModule {}
