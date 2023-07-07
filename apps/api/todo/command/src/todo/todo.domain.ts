import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { TodoCreatedEvent } from './create-todo/todo-created.event';
import { TodoDeletedEvent } from './delete-todo/todo-deleted.event';
import { TodoUpdatedEvent } from './update-todo/todo-updated.event';

export class TodoDomain extends AggregateRoot<
  TodoCreatedEvent | TodoDeletedEvent | TodoUpdatedEvent
> {
  private _id: string;
  private name: string;
  private deleted: boolean;

  private constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
    this.deleted = false;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  static create(name: string) {
    // Business logic
    const instance = new TodoDomain(new Types.ObjectId().toHexString(), name);
    instance.apply(new TodoCreatedEvent(instance.id, instance.name));
    return instance;
  }

  private static onCreate(event: TodoCreatedEvent) {
    return new TodoDomain(event.data.id, event.data.name);
  }

  update(name?: string) {
    if (this.deleted) return;
    // Business logic
    this.apply(new TodoUpdatedEvent(this.id, name));
  }

  private onUpdate(event: TodoUpdatedEvent) {
    this.id = event.data.id;
    event.data.name && (this.name = event.data.name);
  }

  delete() {
    // Business logic
    this.apply(new TodoDeletedEvent(this.id));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onDelete(_event: TodoDeletedEvent) {
    this.deleted = true;
  }

  static async evolveFromEvents(
    events: StreamingRead<
      ResolvedEvent<TodoCreatedEvent | TodoDeletedEvent | TodoUpdatedEvent>
    >,
  ): Promise<TodoDomain> {
    let todoDomainInstance!: TodoDomain;

    for await (const { event } of events) {
      switch (event?.type) {
        case 'TodoCreatedEvent':
          todoDomainInstance = TodoDomain.onCreate(
            new TodoCreatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'TodoUpdatedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          todoDomainInstance.onUpdate(
            new TodoUpdatedEvent(event.data.id, event.data.name),
          );
          break;

        case 'TodoDeletedEvent':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          todoDomainInstance.onDelete(new TodoDeletedEvent(event.data.id));
          break;

        default:
          break;
      }
    }

    return todoDomainInstance;
  }
}
