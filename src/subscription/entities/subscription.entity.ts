import { User } from 'src/auth/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plan } from './plan.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  status: string;

  @Column('timestamp')
  current_period_start: Date;

  @Column('timestamp')
  current_period_end: Date;

  @Column('boolean', { default: false })
  cancel_at_periodo_end: boolean;

  @Column('timestamp', { nullable: true })
  cancel_at: Date;

  @Column('timestamp', { nullable: true })
  canceled_at: Date;

  @Column('timestamp', { nullable: true })
  ended_at: Date;

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
  plan_id: string;

  @ManyToOne(() => Plan, (user) => user.subscriptions)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
