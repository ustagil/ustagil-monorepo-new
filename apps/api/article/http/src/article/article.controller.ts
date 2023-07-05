import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import {
  API_ARTICLE_COMMAND_MS,
  API_ARTICLE_QUERY_MS,
} from '@ustagil/api-constant';
import {
  ArticleGrpcService,
  ArticleHttpCreateRequestBody,
  ArticleHttpCreateResponse,
  ArticleHttpDeleteRequestParams,
  ArticleHttpDeleteResponse,
  ArticleHttpListRequestQuery,
  ArticleHttpListResponse,
  ArticleHttpReadRequestParams,
  ArticleHttpReadResponse,
  ArticleHttpUpdateRequestBody,
  ArticleHttpUpdateRequestParams,
  ArticleHttpUpdateResponse,
  ArticleKafkaCreateRequest,
  ArticleKafkaCreateResponse,
  ArticleKafkaDeleteRequest,
  ArticleKafkaDeleteResponse,
  ArticleKafkaUpdateRequest,
  ArticleKafkaUpdateResponse,
} from '@ustagil/typing';
import { firstValueFrom, toArray } from 'rxjs';

@Controller('articles')
export class ArticleController implements OnModuleInit {
  private articleGrpcService: ArticleGrpcService;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_ARTICLE_QUERY_MS) private clientGrpc: ClientGrpc,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    @Inject(API_ARTICLE_COMMAND_MS) private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.articleGrpcService =
      this.clientGrpc.getService<ArticleGrpcService>('ArticleService');

    await this.clientKafka.connect();
  }

  @Get()
  async list(
    @Query() query: ArticleHttpListRequestQuery,
  ): Promise<ArticleHttpListResponse> {
    const articles = await firstValueFrom(
      this.articleGrpcService.list({ query }).pipe(toArray()),
    );

    return articles;
  }

  @Post()
  create(
    @Body() body: ArticleHttpCreateRequestBody,
  ): ArticleHttpCreateResponse {
    this.clientKafka.emit<
      ArticleKafkaCreateResponse,
      ArticleKafkaCreateRequest
    >('article.create', { body });
  }

  @Get(':id')
  async read(
    @Param() params: ArticleHttpReadRequestParams,
  ): Promise<ArticleHttpReadResponse> {
    const article = await firstValueFrom(
      this.articleGrpcService.read({
        params,
      }),
    );

    if (!article) throw new NotFoundException();

    return article;
  }

  @Patch(':id')
  update(
    @Param() params: ArticleHttpUpdateRequestParams,
    @Body() body: ArticleHttpUpdateRequestBody,
  ): ArticleHttpUpdateResponse {
    this.clientKafka.emit<
      ArticleKafkaUpdateResponse,
      ArticleKafkaUpdateRequest
    >('article.update', {
      params,
      body,
    });
  }

  @Delete(':id')
  delete(
    @Param() params: ArticleHttpDeleteRequestParams,
  ): ArticleHttpDeleteResponse {
    this.clientKafka.emit<
      ArticleKafkaDeleteResponse,
      ArticleKafkaDeleteRequest
    >('article.delete', { params });
  }
}
