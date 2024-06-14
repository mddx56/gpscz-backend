import { User } from 'src/auth/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Alarm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name_alarm: string;

  @Column('timestamp')
  start: Date;

  @Column('timestamp')
  end: Date;

  @Column('bool', { default: false })
  is_temp: boolean;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.alarms)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
