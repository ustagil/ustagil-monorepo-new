import { Complete } from '@ustagil/api-util';
import { ArticleHttpListRequestQuery } from '@ustagil/typing';
import { IsOptional } from 'class-validator';

export class ArticleHttpListRequestQueryDto
  implements Complete<ArticleHttpListRequestQuery>
{
  @IsOptional()
  example: never;
}
