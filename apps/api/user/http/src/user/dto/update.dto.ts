import { Complete } from '@ustagil/api-util';
import {
  UserHttpUpdateRequestBody,
  UserHttpUpdateRequestParams,
} from '@ustagil/typing';
import { IsOptional, IsString } from 'class-validator';

export class UserHttpUpdateRequestParamsDto
  implements Complete<UserHttpUpdateRequestParams>
{
  @IsString()
  id: string;
}

export class UserHttpUpdateRequestBodyDto
  implements Complete<UserHttpUpdateRequestBody>
{
  @IsOptional()
  @IsString()
  username: string | undefined;

  @IsOptional()
  @IsString()
  password: string | undefined;
}
