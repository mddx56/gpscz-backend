import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discount } from './discount.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  valid: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  amount_off: number;

  @Column('text')
  duration: string;

  @Column('int')
  duration_in_months: number;

  @Column('integer')
  max_redemptions: number;

  @Column('timestamp', { nullable: true })
  redeem_by: Date;

  @Column('int')
  times_redeemed: number;

  @Column('uuid')
  discount_id: string;

  @ManyToOne(() => Discount, (discount) => discount.coupon)
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;
}
