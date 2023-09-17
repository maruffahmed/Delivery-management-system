import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  // GET /
  @Get()
  async sayHellp() {
    return {
      message: 'Hello World!',
    };
  }
}
