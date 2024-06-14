import { Device } from './device.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vehicle } from 'src/vehicle/entities';

@Entity('device_vehicle')
export class DeviceVehicle {
  @PrimaryColumn({ name: 'device_id', type: 'uuid' })
  device_id: string;

  @PrimaryColumn({ name: 'vehicle_id', type: 'uuid' })
  vehicle_id: string;

  @ManyToOne(() => Device, (device) => device.vehicles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'device_id', referencedColumnName: 'id' }])
  students: Device[];

  @ManyToOne(() => Vehicle, (vh) => vh.devices, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'vehicle_id', referencedColumnName: 'id' }])
  courses: Vehicle[];
}
