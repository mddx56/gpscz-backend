import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AlarmController,
  CircleController,
  GeofenceController,
  PolygonController,
} from './controllers';
import { Alarm, Circle, Geofence, Polygon } from './entities';
import {
  AlarmService,
  CircleService,
  GeofenceService,
  PolygonService,
} from './services';
@Module({
  controllers: [
    GeofenceController,
    AlarmController,
    CircleController,
    PolygonController,
  ],
  providers: [GeofenceService, AlarmService, CircleService, PolygonService],
  imports: [TypeOrmModule.forFeature([Geofence, Polygon, Circle, Alarm])],
})
export class GeofenceModule {}
