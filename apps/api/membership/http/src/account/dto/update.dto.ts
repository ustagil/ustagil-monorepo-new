import { Complete } from '@ustagil/api-util';
import {
  AccountHttpUpdateRequestBody,
  AccountHttpUpdateRequestParams,
} from '@ustagil/typing';
import { IsOptional, IsString } from 'class-validator';

export class AccountHttpUpdateRequestParamsDto
  implements Complete<AccountHttpUpdateRequestParams>
{
  @IsString()
  id: string;
}

export class AccountHttpUpdateRequestBodyDto
  implements Complete<AccountHttpUpdateRequestBody>
{
  @IsOptional()
  @IsString()
  name: string | undefined;
}
