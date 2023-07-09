import { Complete } from '@ustagil/api-util';
import {
  MembershipHttpUpdateRequestBody,
  MembershipHttpUpdateRequestParams,
} from '@ustagil/typing';
import { IsOptional, IsString } from 'class-validator';

export class MembershipHttpUpdateRequestParamsDto
  implements Complete<MembershipHttpUpdateRequestParams>
{
  @IsString()
  id: string;
}

export class MembershipHttpUpdateRequestBodyDto
  implements Complete<MembershipHttpUpdateRequestBody>
{
  @IsOptional()
  @IsString()
  name: string | undefined;
}
