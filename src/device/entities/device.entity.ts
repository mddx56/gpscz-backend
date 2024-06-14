import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Position } from './position.entity';
import { Vehicle } from 'src/vehicle/entities';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  serial: string;

  @Column('text', {
    nullable: true,
  })
  chipgsm: string;

  @Column('timestamp', {
    nullable: true,
  })
  megas: Date;

  @Column('text')
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  update_at: Date;

  @OneToMany(() => Position, (device) => device.dispositivo)
  positions: Position[];

  @ManyToMany(
    () => Vehicle,
    (vh) => vh.devices, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'device_vehicle',
    joinColumn: {
      name: 'device_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'vehicle_id',
      referencedColumnName: 'id',
    },
  })
  vehicles?: Vehicle[];
}
