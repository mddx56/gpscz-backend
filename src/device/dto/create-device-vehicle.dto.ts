import {
  IsDecimal,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDeviceVehicleDto {
  @IsUUID()
  device_id: string;

  @IsUUID()
  vehicle_id: string;
}
