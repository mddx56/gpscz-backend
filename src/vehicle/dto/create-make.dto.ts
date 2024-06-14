import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMakeDto {
  @IsNotEmpty()
  @IsString()
  make_name: string;
}
