import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { UserCreatedEvent } from './create-user/user-created.event';
import { UserDeletedEvent } from './delete-user/user-deleted.event';
import { UserUpdatedEvent } from './update-user/user-updated.event';

export class UserDomain extends AggregateRoot {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name = '') {
    super();
    this.name = name;
    this.id = id;
  }

  static create(name: string) {
    // Business logic
    const instance = new UserDomain(new Types.ObjectId().toHexString(), name);
    instance.apply(new UserCreatedEvent(instance.id, instance.name));
    return instance;
  }

  update(name?: string) {
    // Business logic
    this.apply(new UserUpdatedEvent(this.id, name));
  }

  delete() {
    // Business logic
    this.apply(new UserDeletedEvent(this.id));
  }
}
