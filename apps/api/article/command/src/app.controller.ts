import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  Article,
  ArticleKafkaCreateRequest,
  ArticleKafkaCreateResponse,
  ArticleKafkaDeleteRequest,
  ArticleKafkaDeleteResponse,
  ArticleKafkaUpdateRequest,
  ArticleKafkaUpdateResponse,
} from '@ustagil/typing';

@Controller()
export class AppController {
  articles: Article[] = [];

  @MessagePattern('article.create')
  create(dto: ArticleKafkaCreateRequest): ArticleKafkaCreateResponse {
    const nextId = this.articles.length;
    const newArticle: Article = { id: `${nextId}`, ...dto.body };
    this.articles.push(newArticle);
    return newArticle;
  }

  @MessagePattern('article.update')
  update(dto: ArticleKafkaUpdateRequest): ArticleKafkaUpdateResponse {
    const foundIndex = this.articles.findIndex((e) => e.id === dto.params.id);
    this.articles = this.articles.map((e, i) =>
      i === foundIndex ? { ...e, ...dto.body } : e,
    );
    return this.articles[foundIndex];
  }

  @MessagePattern('article.delete')
  delete(dto: ArticleKafkaDeleteRequest): ArticleKafkaDeleteResponse {
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
