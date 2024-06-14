import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModelDto {
  @IsNotEmpty()
  @IsString()
  model_name: string;

  @IsNotEmpty()
  @IsString()
  vehicleTypeId: string;

  @IsNotEmpty()
  @IsString()
  makeId: string;
}
