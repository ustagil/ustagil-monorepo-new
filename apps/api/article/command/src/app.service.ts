import { Injectable } from '@nestjs/common';
import { Article } from '@ustagil/typing';

@Injectable()
export class AppService {
  articles: Article[] = [
    { id: '1', name: '1 item' },
    { id: '2', name: '2 item' },
    { id: '3', name: '3 item' },
    { id: '4', name: '4 item' },
    { id: '5', name: '5 item' },
    { id: '6', name: '6 item' },
  ];

  list(params: { id: string }): Article[] {
    return this.articles.filter((e) => e.id !== params.id);
  }
}
