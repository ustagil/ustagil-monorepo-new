export class UpdateArticleCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string | undefined,
  ) {}
}
