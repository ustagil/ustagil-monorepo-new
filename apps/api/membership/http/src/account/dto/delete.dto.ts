import { Complete } from '@ustagil/api-util';
import { AccountHttpDeleteRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class AccountHttpDeleteRequestParamsDto
  implements Complete<AccountHttpDeleteRequestParams>
{
  @IsString()
  id: string;
}
