import { Complete } from '@ustagil/api-util';
import { ArticleHttpReadRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class ArticleHttpReadRequestParamsDto
  implements Complete<ArticleHttpReadRequestParams>
{
  @IsString()
  id: string;
}
