import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CouponController,
  DiscountController,
  PlanController,
  SubscriptionController,
  WebHookEventController,
} from './controllers';
import { Coupon, Discount, Plan, Subscription, WebHookEvent } from './entities';
import {
  CouponService,
  DiscountService,
  PlanService,
  SubscriptionService,
  WebHookEventService,
} from './services';

@Module({
  controllers: [
    SubscriptionController,
    CouponController,
    DiscountController,
    PlanController,
    WebHookEventController,
  ],
  providers: [
    SubscriptionService,
    CouponService,
    DiscountService,
    PlanService,
    WebHookEventService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Subscription,
      Coupon,
      Plan,
      WebHookEvent,
      Discount,
    ]),
  ],
})
export class SubscriptionModule {}
