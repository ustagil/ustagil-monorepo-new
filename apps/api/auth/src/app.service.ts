import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  login(dto: unknown): string {
    return 'Hello World!';
  }
}
