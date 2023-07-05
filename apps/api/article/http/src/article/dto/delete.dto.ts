import { Complete } from '@ustagil/api-util';
import { ArticleHttpDeleteRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class ArticleHttpDeleteRequestParamsDto
  implements Complete<ArticleHttpDeleteRequestParams>
{
  @IsString()
  id: string;
}
