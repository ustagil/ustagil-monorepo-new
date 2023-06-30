import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';

describe('TodoController', () => {
  let appController: TodoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
    }).compile();

    appController = app.get<TodoController>(TodoController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
