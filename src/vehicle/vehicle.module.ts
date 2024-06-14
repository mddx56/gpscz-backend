import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  VehicleController,
  VehicleTypeController,
  MakeController,
  ModelController,
} from './controllers';
import { Vehicle, VehicleType, Make, Model } from './entities';
import {
  VehicleService,
  VehicleTypeService,
  ModelService,
  MakeService,
} from './services';

@Module({
  controllers: [
    VehicleController,
    VehicleTypeController,
    MakeController,
    ModelController,
  ],
  providers: [VehicleService, VehicleTypeService, ModelService, MakeService],
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleType, Make, Model])],
})
export class VehicleModule {}
