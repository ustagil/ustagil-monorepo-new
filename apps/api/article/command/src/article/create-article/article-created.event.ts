export class ArticleCreatedEvent {
  constructor(public readonly id: string, public readonly name: string) {}
}
