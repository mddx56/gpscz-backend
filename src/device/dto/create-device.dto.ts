import { IsDate, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsNumberString()
  @IsNotEmpty()
  serial: string;

  @IsNumberString()
  @IsString()
  chipgsm: string;

  @IsDate()
  megas: Date;

  @IsNumberString()
  @IsString()
  state: string;
}
