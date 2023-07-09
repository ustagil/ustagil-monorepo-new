import { Complete } from '@ustagil/api-util';
import { OrganizationHttpCreateRequestBody } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class OrganizationHttpCreateRequestBodyDto
  implements Complete<OrganizationHttpCreateRequestBody>
{
  @IsString()
  name: string;
}
