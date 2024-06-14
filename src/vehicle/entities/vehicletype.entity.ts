import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from './model.entity';

@Entity()
export class VehicleType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  type_name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Model, (model) => model.vehicle_type)
  vehicle_types: Model[];
}
