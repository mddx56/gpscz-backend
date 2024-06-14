import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coupon } from './coupon.entity';
import { Subscription } from './subscription.entity';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  start: Date;

  @Column('timestamp')
  end: Date;

  @Column('text')
  promotion_code: string;

  @OneToMany(() => Coupon, (photo) => photo.discount)
  coupon: Coupon[];

  @Column('uuid')
  subscription_id: string;

  @OneToOne(() => Subscription)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;
}
