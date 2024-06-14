import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleTypeDto {
  @IsNotEmpty()
  @IsString()
  type_name: string;
}
