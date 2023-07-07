export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly username?: string | undefined,
    public readonly password?: string | undefined,
  ) {}
}
