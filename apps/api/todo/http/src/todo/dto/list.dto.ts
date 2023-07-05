import { Complete } from '@ustagil/api-util';
import { TodoHttpListRequestQuery } from '@ustagil/typing';
import { IsOptional } from 'class-validator';

export class TodoHttpListRequestQueryDto
  implements Complete<TodoHttpListRequestQuery>
{
  @IsOptional()
  example: never;
}
