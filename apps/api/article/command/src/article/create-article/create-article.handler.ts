import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ArticleDomain } from '../article.domain';
import { CreateArticleCommand } from './create-article.command';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateArticleCommand) {
    const article = ArticleDomain.create(command.name);
    const articleDomain = this.publisher.mergeObjectContext(article);

    articleDomain.commit();
  }
}
