import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Geofence } from './geofence.entity';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  geofence_id: string;

  @ManyToOne(() => Geofence, (geo) => geo.circles)
  @JoinColumn({ name: 'geofence_id' })
  geofence: Geofence;
}
