export class ArticleUpdatedEvent {
  constructor(public readonly id: string, public readonly name?: string) {}
}
