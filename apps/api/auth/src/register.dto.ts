import { IsString } from 'class-validator';

export class RegisterAuthRequestBodyDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
