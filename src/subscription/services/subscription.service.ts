import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from '../entities';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const subscriptionData = await this.subscriptionRepository.create(
      createSubscriptionDto,
    );
    return this.subscriptionRepository.save(subscriptionData);
  }

  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find();
  }

  async findOne(id: string): Promise<Subscription> {
    const subscriptionData = await this.subscriptionRepository.findOneBy({
      id,
    });
    if (!subscriptionData) {
      throw new HttpException('Subscription Not Found', 404);
    }
    return subscriptionData;
  }

  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    const existingSubscription = await this.findOne(id);
    const subscriptionData = this.subscriptionRepository.merge(
      existingSubscription,
      updateSubscriptionDto,
    );
    return await this.subscriptionRepository.save(subscriptionData);
  }

  async remove(id: string): Promise<Subscription> {
    const existingSubscription = await this.findOne(id);
    return await this.subscriptionRepository.remove(existingSubscription);
  }
}
