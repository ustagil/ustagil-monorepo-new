import { Complete } from '@ustagil/api-util';
import { OrganizationHttpReadRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class OrganizationHttpReadRequestParamsDto
  implements Complete<OrganizationHttpReadRequestParams>
{
  @IsString()
  id: string;
}
