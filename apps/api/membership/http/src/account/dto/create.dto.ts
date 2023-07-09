import { Complete } from '@ustagil/api-util';
import { AccountHttpCreateRequestBody } from '@ustagil/typing';
import { IsString } from 'class-validator';

export class AccountHttpCreateRequestBodyDto
  implements Complete<AccountHttpCreateRequestBody>
{
  @IsString()
  name: string;
}
