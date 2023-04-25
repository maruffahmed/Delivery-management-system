import { Test, TestingModule } from '@nestjs/testing';
import { FiledPackageHandlersService } from './filed-package-handlers.service';

describe('FiledPackageHandlersService', () => {
  let service: FiledPackageHandlersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiledPackageHandlersService],
    }).compile();

    service = module.get<FiledPackageHandlersService>(
      FiledPackageHandlersService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
