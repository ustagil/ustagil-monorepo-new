import { Complete } from '@ustagil/api-util';
import { MembershipHttpDeleteRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class MembershipHttpDeleteRequestParamsDto
  implements Complete<MembershipHttpDeleteRequestParams>
{
  @IsString()
  id: string;
}
