import { Alarm, Geofence } from 'src/geofence/entities';
import { Subscription } from 'src/subscription/entities';
import { Vehicle } from 'src/vehicle/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  username: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    default: '',
  })
  avatar: string;

  @Column('bool', {
    default: true,
  })
  is_active: boolean;

  @Column('text', {
    default: '',
  })
  status: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @CreateDateColumn()
  create_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  update_at: Date;

  @OneToMany(() => Vehicle, (vh) => vh.user)
  vehicles: Vehicle[];

  @OneToMany(() => Subscription, (subs) => subs.user)
  subscriptions: Subscription[];

  @OneToMany(() => Geofence, (geo) => geo.user)
  geofences: Geofence[];

  @OneToMany(() => Alarm, (alarm) => alarm.user)
  alarms: Alarm[];
}
