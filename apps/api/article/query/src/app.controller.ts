import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Article, ArticleListDto, ArticleReadDto } from '@ustagil/typing';
import { Observable, from } from 'rxjs';

@Controller()
export class AppController {
  articles: Article[] = [
    { id: '1', name: 'name 1' },
    { id: '2', name: 'name 2' },
    { id: '3', name: 'name 3' },
  ];

  @GrpcMethod('ArticleService', 'List')
  list(dto: ArticleListDto): Observable<Article> {
    return from(this.articles);
  }

  @GrpcMethod('ArticleService', 'Read')
  read(dto: ArticleReadDto): Article {
    return this.articles.find((e) => e.id === dto.params.id);
  }
}
