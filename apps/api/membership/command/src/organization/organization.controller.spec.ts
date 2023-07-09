import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';

describe('OrganizationController', () => {
  let appController: OrganizationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
    }).compile();

    appController = app.get<OrganizationController>(OrganizationController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
