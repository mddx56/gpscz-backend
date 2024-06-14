import { PartialType } from '@nestjs/swagger';
import { CreateDeviceVehicleDto } from './create-device-vehicle.dto';

export class UpdateDeviceVehicleDto extends PartialType(
  CreateDeviceVehicleDto,
) {}
