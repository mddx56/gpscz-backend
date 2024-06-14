import { IsNotEmpty, IsNumberString, IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  ci: string;

  @IsString()
  firt_name: string;

  @IsString()
  last_name: string;

  @IsNumberString()
  phone: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}
