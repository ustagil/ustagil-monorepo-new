import { Test, TestingModule } from '@nestjs/testing';
import { MembershipController } from './membership.controller';

describe('MembershipController', () => {
  let appController: MembershipController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MembershipController],
    }).compile();

    appController = app.get<MembershipController>(MembershipController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
