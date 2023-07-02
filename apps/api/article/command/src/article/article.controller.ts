import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import {
  ArticleKafkaCreateRequest,
  ArticleKafkaDeleteRequest,
  ArticleKafkaUpdateRequest,
} from '@ustagil/typing';
import { CreateArticleCommand } from './create-article/create-article.command';
import { DeleteArticleCommand } from './delete-article/delete-article.command';
import { UpdateArticleCommand } from './update-article/update-article.command';

@Controller()
export class ArticleController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern('article.create')
  async create(dto: ArticleKafkaCreateRequest) {
    await this.commandBus.execute(new CreateArticleCommand(dto.body.name));
  }

  @MessagePattern('article.update')
  async update(dto: ArticleKafkaUpdateRequest) {
    await this.commandBus.execute(
      new UpdateArticleCommand(dto.params.id, dto.body.name),
    );
  }

  @MessagePattern('article.delete')
  async delete(dto: ArticleKafkaDeleteRequest) {
    await this.commandBus.execute(new DeleteArticleCommand(dto.params.id));
  }
}
