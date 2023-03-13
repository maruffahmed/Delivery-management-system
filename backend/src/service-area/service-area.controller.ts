import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ServiceAreaService } from './service-area.service';

@Controller('service-area')
export class ServiceAreaController {
  constructor(private serviceAreaService: ServiceAreaService) {}

  @Get('tree')
  @UseGuards(JwtAuthGuard)
  async divisions() {
    const divisions = await this.serviceAreaService.divisions(
      {},
      {
        include: {
          districts: {
            include: {
              areas: true,
            },
          },
        },
      },
    );
    return {
      divisions,
    };
  }
}
