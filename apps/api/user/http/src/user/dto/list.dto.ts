import { Complete } from '@ustagil/api-util';
import { UserHttpListRequestQuery } from '@ustagil/typing';
import { IsOptional } from 'class-validator';

export class UserHttpListRequestQueryDto
  implements Complete<UserHttpListRequestQuery>
{
  @IsOptional()
  example: never;
}
