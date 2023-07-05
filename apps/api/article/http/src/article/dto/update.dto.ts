import { Complete } from '@ustagil/api-util';
import {
  ArticleHttpUpdateRequestBody,
  ArticleHttpUpdateRequestParams,
} from '@ustagil/typing';
import { IsOptional, IsString } from 'class-validator';

export class ArticleHttpUpdateRequestParamsDto
  implements Complete<ArticleHttpUpdateRequestParams>
{
  @IsString()
  id: string;
}

export class ArticleHttpUpdateRequestBodyDto
  implements Complete<ArticleHttpUpdateRequestBody>
{
  @IsOptional()
  @IsString()
  name: string | undefined;
}
