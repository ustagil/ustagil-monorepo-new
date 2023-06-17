import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  list(): string {
    return 'Hello World!';
  }

  create(): string {
    return 'Hello World!';
  }

  read(): string {
    return 'Hello World!';
  }

  update(): string {
    return 'Hello World!';
  }

  delete(): string {
    return 'Hello World!';
  }
}
