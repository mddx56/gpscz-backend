import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleTypeDto } from './create-vehicletype.dto';

export class UpdateVehicleTypeDto extends PartialType(CreateVehicleTypeDto) {}
