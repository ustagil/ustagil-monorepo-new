export class UpdateMembershipCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string | undefined,
  ) {}
}
