import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';

describe('ArticleController', () => {
  let appController: ArticleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
    }).compile();

    appController = app.get<ArticleController>(ArticleController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
