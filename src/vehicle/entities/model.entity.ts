import {
  Column,
  Point,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Make } from './make.entity';
import { VehicleType } from './vehicletype.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  model_name: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('uuid')
  vehicle_type_id: string;

  @ManyToOne(() => VehicleType, (vt) => vt.vehicle_types)
  @JoinColumn({ name: 'vehicle_type_id' })
  public vehicle_type: VehicleType;

  @Column('uuid')
  make_id: string;

  @ManyToOne(() => Make, (make) => make.models)
  @JoinColumn({ name: 'make_id' })
  public make: Make;

  //ojo
  @OneToMany(() => Vehicle, (vehicle) => vehicle.model)
  public vehicles: Vehicle[];
}
