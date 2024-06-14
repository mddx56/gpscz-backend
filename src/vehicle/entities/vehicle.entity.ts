import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from './model.entity';
import { User } from 'src/auth/entities';
import { Device } from 'src/device/entities';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  placa: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('int', { nullable: true })
  year: number;

  @Column('float', { nullable: true })
  km_liter: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  update_at: Date;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.vehicles)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column('uuid')
  model_id: string;

  @ManyToOne(() => Model, (model) => model.vehicles)
  @JoinColumn({ name: 'model_id' })
  public model: Model;

  @ManyToMany(() => Vehicle, (vh) => vh.devices, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  devices?: Device[];
}
