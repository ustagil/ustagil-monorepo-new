import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ArticleDomain } from '../article.domain';
import { DeleteArticleCommand } from './delete-article.command';

@CommandHandler(DeleteArticleCommand)
export class DeleteArticleHandler
  implements ICommandHandler<DeleteArticleCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: DeleteArticleCommand) {
    const articleDomain = this.publisher.mergeObjectContext(
      new ArticleDomain(command.id),
    );

    articleDomain.delete();
    articleDomain.commit();
  }
}
