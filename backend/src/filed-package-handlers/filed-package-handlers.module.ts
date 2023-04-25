import { Module } from '@nestjs/common';
import { FiledPackageHandlersService } from './filed-package-handlers.service';
import { FiledPackageHandlersController } from './filed-package-handlers.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    FiledPackageHandlersService,
    PrismaService,
    RolesService,
    UsersService,
  ],
  controllers: [FiledPackageHandlersController],
})
export class FiledPackageHandlersModule {}
