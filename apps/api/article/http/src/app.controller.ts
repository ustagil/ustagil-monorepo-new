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
  ArticleCreateDto,
  ArticleDeleteDto,
  ArticleListDto,
  ArticleReadDto,
  ArticleUpdateDto,
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
    @Param() params: ArticleListDto['params'],
    @Query() query: ArticleListDto['query'],
  ): Promise<Article[]> {
    return await firstValueFrom(
      this.articleGrpcService.list({ params, query }).pipe(toArray()),
    );
  }

  @Post()
  async create(
    @Param() params: ArticleCreateDto['params'],
    @Query() query: ArticleCreateDto['query'],
    @Body() body: ArticleCreateDto['body'],
  ): Promise<Article> {
    return await firstValueFrom(
      this.clientKafka.send('article.create', { params, query, body }),
    );
  }

  @Get(':id')
  async read(
    @Param() params: ArticleReadDto['params'],
    @Query() query: ArticleReadDto['query'],
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
    @Param() params: ArticleUpdateDto['params'],
    @Body() body: ArticleUpdateDto['body'],
  ): Promise<Article> {
    return await firstValueFrom(
      this.clientKafka.send('article.update', {
        params,
        body,
      }),
    );
  }

  @Delete(':id')
  async delete(@Param() params: ArticleDeleteDto['params']): Promise<Article> {
    return await firstValueFrom(
      this.clientKafka.send('article.delete', { params }),
    );
  }
}

interface ArticleGrpcService {
  list(data: ArticleListDto): Observable<Article>;
  read(data: ArticleReadDto): Observable<any>;
}
