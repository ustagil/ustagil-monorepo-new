import { Complete } from '@ustagil/api-util';
import { OrganizationHttpDeleteRequestParams } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class OrganizationHttpDeleteRequestParamsDto
  implements Complete<OrganizationHttpDeleteRequestParams>
{
  @IsString()
  id: string;
}
