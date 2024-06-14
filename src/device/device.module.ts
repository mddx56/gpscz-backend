import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DeviceController,
  PositionController,
  DeviceVehicleController,
} from './controllers';
import { Device, Position, DeviceVehicle } from './entities';
import {
  DeviceService,
  DeviceVehicleService,
  PositionService,
} from './services';

@Module({
  controllers: [PositionController, DeviceController, DeviceVehicleController],
  providers: [PositionService, DeviceService, DeviceVehicleService],
  imports: [TypeOrmModule.forFeature([Device, Position, DeviceVehicle])],
})
export class DeviceModule {}
