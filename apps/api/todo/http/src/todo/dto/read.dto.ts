import { Complete } from '@ustagil/api-util';
import { TodoHttpReadRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class TodoHttpReadRequestParamsDto
  implements Complete<TodoHttpReadRequestParams>
{
  @IsString()
  id: string;
}
