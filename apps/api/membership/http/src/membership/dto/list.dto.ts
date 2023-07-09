import { Complete } from '@ustagil/api-util';
import { MembershipHttpListRequestQuery } from '@ustagil/typing';
import { IsOptional } from 'class-validator';

export class MembershipHttpListRequestQueryDto
  implements Complete<MembershipHttpListRequestQuery>
{
  @IsOptional()
  example: never;
}
