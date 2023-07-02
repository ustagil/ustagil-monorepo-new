import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ArticleDomain } from '../article.domain';
import { UpdateArticleCommand } from './update-article.command';

@CommandHandler(UpdateArticleCommand)
export class UpdateArticleHandler
  implements ICommandHandler<UpdateArticleCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: UpdateArticleCommand) {
    const articleDomain = this.publisher.mergeObjectContext(
      new ArticleDomain(command.id),
    );

    articleDomain.update();
    articleDomain.commit();
  }
}
