import { Complete } from '@ustagil/api-util';
import { UserHttpDeleteRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class UserHttpDeleteRequestParamsDto
  implements Complete<UserHttpDeleteRequestParams>
{
  @IsString()
  id: string;
}
