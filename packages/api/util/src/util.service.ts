import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  getHello(): string {
    return 'H  ello World!';
  }
}
