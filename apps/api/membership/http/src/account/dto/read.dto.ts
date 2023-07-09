import { Complete } from '@ustagil/api-util';
import { AccountHttpReadRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class AccountHttpReadRequestParamsDto
  implements Complete<AccountHttpReadRequestParams>
{
  @IsString()
  id: string;
}
