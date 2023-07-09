import { Complete } from '@ustagil/api-util';
import { UserHttpReadRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class UserHttpReadRequestParamsDto
  implements Complete<UserHttpReadRequestParams>
{
  @IsString()
  id: string;
}
