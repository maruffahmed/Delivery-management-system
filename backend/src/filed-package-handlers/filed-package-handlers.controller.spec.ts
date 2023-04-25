import { Test, TestingModule } from '@nestjs/testing';
import { FiledPackageHandlersController } from './filed-package-handlers.controller';

describe('FiledPackageHandlersController', () => {
  let controller: FiledPackageHandlersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiledPackageHandlersController],
    }).compile();

    controller = module.get<FiledPackageHandlersController>(
      FiledPackageHandlersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
