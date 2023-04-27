import { Module } from '@nestjs/common';
import { FiledPackageHandlersService } from 'src/filed-package-handlers/filed-package-handlers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParcelsController } from './parcels.controller';
import { ParcelsService } from './parcels.service';

@Module({
  providers: [ParcelsService, PrismaService, FiledPackageHandlersService],
  controllers: [ParcelsController],
  exports: [ParcelsService],
})
export class ParcelsModule {}
