import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { TodoCreatedEvent } from './create-todo/todo-created.event';
import { TodoDeletedEvent } from './delete-todo/todo-deleted.event';
import { TodoUpdatedEvent } from './update-todo/todo-updated.event';

export class TodoDomain extends AggregateRoot {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name = '') {
    super();
    this.name = name;
    this.id = id;
  }

  static create(name: string) {
    // Business logic
    const instance = new TodoDomain(new Types.ObjectId().toHexString(), name);
    instance.apply(new TodoCreatedEvent(instance.id, instance.name));
    return instance;
  }

  update(name?: string) {
    // Business logic
    this.apply(new TodoUpdatedEvent(this.id, name));
  }

  delete() {
    // Business logic
    this.apply(new TodoDeletedEvent(this.id));
  }
}
