import { Test, TestingModule } from '@nestjs/testing';
import { IpWhitelistController } from './ip-whitelist.controller';

describe('IpWhitelistController', () => {
  let controller: IpWhitelistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpWhitelistController],
    }).compile();

    controller = module.get<IpWhitelistController>(IpWhitelistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
