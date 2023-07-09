export class UpdateOrganizationCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string | undefined,
  ) {}
}
