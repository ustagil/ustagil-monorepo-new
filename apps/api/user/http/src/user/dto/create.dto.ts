import { Complete } from '@ustagil/api-util';
import { UserHttpCreateRequestBody } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class UserHttpCreateRequestBodyDto
  implements Complete<UserHttpCreateRequestBody>
{
  @IsString()
  username: string;

  @IsString()
  password: string;
}
