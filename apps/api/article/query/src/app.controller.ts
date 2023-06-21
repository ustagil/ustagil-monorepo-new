import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('ArticleService', 'FindOne')
  findOne(
    data: ArticleById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Article {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}

interface ArticleById {
  id: number;
}

interface Article {
  id: number;
  name: string;
}
