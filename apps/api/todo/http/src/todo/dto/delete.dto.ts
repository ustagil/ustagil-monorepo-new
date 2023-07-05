import { Complete } from '@ustagil/api-util';
import { TodoHttpDeleteRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class TodoHttpDeleteRequestParamsDto
  implements Complete<TodoHttpDeleteRequestParams>
{
  @IsString()
  id: string;
}
