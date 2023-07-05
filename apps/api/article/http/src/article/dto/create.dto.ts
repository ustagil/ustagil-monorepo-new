import { Complete } from '@ustagil/api-util';
import { ArticleHttpCreateRequestBody } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class ArticleHttpCreateRequestBodyDto
  implements Complete<ArticleHttpCreateRequestBody>
{
  @IsString()
  name: string;
}
