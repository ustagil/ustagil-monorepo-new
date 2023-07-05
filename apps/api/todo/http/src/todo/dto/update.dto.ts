import { Complete } from '@ustagil/api-util';
import {
  TodoHttpUpdateRequestBody,
  TodoHttpUpdateRequestParams,
} from '@ustagil/typing';
import { IsOptional, IsString } from 'class-validator';

export class TodoHttpUpdateRequestParamsDto
  implements Complete<TodoHttpUpdateRequestParams>
{
  @IsString()
  id: string;
}

export class TodoHttpUpdateRequestBodyDto
  implements Complete<TodoHttpUpdateRequestBody>
{
  @IsOptional()
  @IsString()
  name: string | undefined;
}
