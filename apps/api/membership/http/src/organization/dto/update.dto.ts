import { Complete } from '@ustagil/api-util';
import {
  OrganizationHttpUpdateRequestBody,
  OrganizationHttpUpdateRequestParams,
} from '@ustagil/typing';
import { IsOptional, IsString } from 'class-validator';

export class OrganizationHttpUpdateRequestParamsDto
  implements Complete<OrganizationHttpUpdateRequestParams>
{
  @IsString()
  id: string;
}

export class OrganizationHttpUpdateRequestBodyDto
  implements Complete<OrganizationHttpUpdateRequestBody>
{
  @IsOptional()
  @IsString()
  name: string | undefined;
}
