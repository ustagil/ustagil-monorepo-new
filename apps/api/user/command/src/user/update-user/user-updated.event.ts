export class UserUpdatedEvent {
  constructor(public readonly id: string, public readonly name?: string) {}
}
