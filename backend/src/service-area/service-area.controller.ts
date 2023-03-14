import { Controller, Get } from '@nestjs/common';
import { ServiceAreaService } from './service-area.service';

@Controller('service-area')
export class ServiceAreaController {
  constructor(private serviceAreaService: ServiceAreaService) {}

  @Get('tree')
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
