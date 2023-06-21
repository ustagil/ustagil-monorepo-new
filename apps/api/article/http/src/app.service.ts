import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import {
  Article,
  ArticleCreateDto,
  ArticleDeleteDto,
  ArticleListDto,
  ArticleReadDto,
  ArticleUpdateDto,
} from '@ustagil/typing';
import { Observable } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  private articleGrpcService: ArticleGrpcService;

  constructor(
    @Inject('ARTICLE_PACKAGE') private clientGrpc: ClientGrpc,
    @Inject('ARTICLE_SERVICE') private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.articleGrpcService =
      this.clientGrpc.getService<ArticleGrpcService>('ArticleService');
    this.clientKafka.subscribeToResponseOf('article.list');
    await this.clientKafka.connect();
  }

  grpcTest(): Observable<string> {
    return this.articleGrpcService.findOne({ id: 2 });
  }

  kafkaTest(): Observable<string> {
    return this.clientKafka.send('article.list', { id: '2' });
  }

  articles: Article[] = [];

  list(dto: ArticleListDto): Article[] {
    dto;
    return this.articles;
  }

  create(dto: ArticleCreateDto): Article {
    const nextId = this.articles.length;
    const newArticle: Article = { id: `${nextId}`, ...dto.body };
    this.articles.push(newArticle);
    return newArticle;
  }

  read(dto: ArticleReadDto): Article {
    return this.articles.find((e) => e.name === dto.params.id);
  }

  update(dto: ArticleUpdateDto): Article {
    const foundIndex = this.articles.findIndex((e) => e.id === dto.params.id);
    this.articles = this.articles.map((e, i) =>
      i === foundIndex ? { ...e, ...dto.body } : e,
    );
    return this.articles[foundIndex];
  }

  delete(dto: ArticleDeleteDto): Article {
    return removeObjectWithId(this.articles, dto.params.id);
  }
}

function removeObjectWithId<T extends { id: string }>(
  arr: Array<T>,
  id: string,
): T {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

  if (objWithIdIndex > -1) {
    const obj = arr[objWithIdIndex];
    arr.splice(objWithIdIndex, 1);
    return obj;
  }

  return null;
}

interface ArticleGrpcService {
  findOne(data: { id: number }): Observable<any>;
}
