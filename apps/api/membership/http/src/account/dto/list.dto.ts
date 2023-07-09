import { Complete } from '@ustagil/api-util';
import { AccountHttpListRequestQuery } from '@ustagil/typing';
import { IsOptional } from 'class-validator';

export class AccountHttpListRequestQueryDto
  implements Complete<AccountHttpListRequestQuery>
{
  @IsOptional()
  example: never;
}
