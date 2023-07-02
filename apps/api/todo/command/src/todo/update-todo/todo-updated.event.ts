export class TodoUpdatedEvent {
  constructor(public readonly id: string, public readonly name?: string) {}
}
