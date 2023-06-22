import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import {
  Article,
  ArticleGrpcListRequest,
  ArticleGrpcListResponse,
  ArticleGrpcReadRequest,
  ArticleGrpcReadResponse,
  ArticleKafkaCreateRequest,
  ArticleKafkaCreateResponse,
  ArticleKafkaDeleteRequest,
  ArticleKafkaDeleteResponse,
  ArticleKafkaUpdateRequest,
  ArticleKafkaUpdateResponse,
} from '@ustagil/typing';
import { Observable, firstValueFrom, toArray } from 'rxjs';

@Controller('articles')
export class AppController implements OnModuleInit {
  private articleGrpcService: ArticleGrpcService;

  constructor(
    @Inject('ARTICLE_QUERY') private clientGrpc: ClientGrpc,
    @Inject('ARTICLE_COMMAND') private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.articleGrpcService =
      this.clientGrpc.getService<ArticleGrpcService>('ArticleService');

    this.clientKafka.subscribeToResponseOf('article.create');
    this.clientKafka.subscribeToResponseOf('article.update');
    this.clientKafka.subscribeToResponseOf('article.delete');

    await this.clientKafka.connect();
  }

  @Get()
  async list(
    @Param() params: ArticleGrpcListRequest['params'],
    @Query() query: ArticleGrpcListRequest['query'],
  ): Promise<Article[]> {
    return await firstValueFrom(
      this.articleGrpcService.list({ params, query }).pipe(toArray()),
    );
  }

  @Post()
  async create(
    @Param() params: ArticleKafkaCreateRequest['params'],
    @Query() query: ArticleKafkaCreateRequest['query'],
    @Body() body: ArticleKafkaCreateRequest['body'],
  ): Promise<Article> {
    return await firstValueFrom(
      this.clientKafka.send<
        ArticleKafkaCreateResponse,
        ArticleKafkaCreateRequest
      >('article.create', { params, query, body }),
    );
  }

  @Get(':id')
  async read(
    @Param() params: ArticleGrpcReadRequest['params'],
    @Query() query: ArticleGrpcReadRequest['query'],
  ): Promise<Article> {
    return await firstValueFrom(
      this.articleGrpcService.read({
        params,
        query,
      }),
    );
  }

  @Patch(':id')
  async update(
    @Param() params: ArticleKafkaUpdateRequest['params'],
    @Body() body: ArticleKafkaUpdateRequest['body'],
  ): Promise<Article> {
    return await firstValueFrom(
      this.clientKafka.send<
        ArticleKafkaUpdateResponse,
        ArticleKafkaUpdateRequest
      >('article.update', {
        params,
        body,
      }),
    );
  }

  @Delete(':id')
  async delete(
    @Param() params: ArticleKafkaDeleteRequest['params'],
  ): Promise<Article> {
    return await firstValueFrom(
      this.clientKafka.send<
        ArticleKafkaDeleteResponse,
        ArticleKafkaDeleteRequest
      >('article.delete', { params }),
    );
  }
}

interface ArticleGrpcService {
  list(data: ArticleGrpcListRequest): Observable<ArticleGrpcListResponse>;
  read(data: ArticleGrpcReadRequest): Observable<ArticleGrpcReadResponse>;
}
