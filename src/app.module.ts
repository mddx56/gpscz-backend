import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';
import { GeofenceModule } from './geofence/geofence.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_DB,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    VehicleModule,
    AuthModule,
    DeviceModule,
    GeofenceModule,
    SubscriptionModule,
  ],
})
export class AppModule {}
