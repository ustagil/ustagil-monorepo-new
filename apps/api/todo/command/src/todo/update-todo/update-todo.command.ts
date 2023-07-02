export class UpdateTodoCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string | undefined,
  ) {}
}
