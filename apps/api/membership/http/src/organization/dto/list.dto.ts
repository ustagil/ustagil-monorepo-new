import { Complete } from '@ustagil/api-util';
import { OrganizationHttpListRequestQuery } from '@ustagil/typing';
import { IsOptional } from 'class-validator';

export class OrganizationHttpListRequestQueryDto
  implements Complete<OrganizationHttpListRequestQuery>
{
  @IsOptional()
  example: never;
}
