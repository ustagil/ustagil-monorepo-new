import { Complete } from '@ustagil/api-util';
import { MembershipHttpReadRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class MembershipHttpReadRequestParamsDto
  implements Complete<MembershipHttpReadRequestParams>
{
  @IsString()
  id: string;
}
