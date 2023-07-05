import { Complete } from '@ustagil/api-util';
import { TodoHttpCreateRequestBody } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class TodoHttpCreateRequestBodyDto
  implements Complete<TodoHttpCreateRequestBody>
{
  @IsString()
  name: string;
}
