import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn('increment')
  id: number;

  /*@Column('double precision')
  longitude: number;

  @Column('double precision')
  latitude: number;*/

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  point: Point;

  @Column('float', {
    nullable: true,
  })
  speed: number;

  @Column('float', {
    nullable: true,
  })
  batt: number;

  @CreateDateColumn()
  created_at: Date;

  @Column('uuid')
  device_id: string;

  @ManyToOne(() => Device, (device) => device.positions)
  @JoinColumn({ name: 'device_id' })
  dispositivo: Device;
}
