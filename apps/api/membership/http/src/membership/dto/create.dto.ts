import { Complete } from '@ustagil/api-util';
import { MembershipHttpCreateRequestBody } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class MembershipHttpCreateRequestBodyDto
  implements Complete<MembershipHttpCreateRequestBody>
{
  @IsString()
  name: string;
}
