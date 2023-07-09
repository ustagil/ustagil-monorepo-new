export class UpdateAccountCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string | undefined,
  ) {}
}
