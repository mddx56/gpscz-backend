import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from '../entities';
import { Repository } from 'typeorm';
import { CreateCouponDto, UpdateCouponDto } from '../dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const couponData = await this.couponRepository.create(createCouponDto);
    return this.couponRepository.save(couponData);
  }

  async findAll(): Promise<Coupon[]> {
    return await this.couponRepository.find();
  }

  async findOne(id: string): Promise<Coupon> {
    const couponData = await this.couponRepository.findOneBy({ id });
    if (!couponData) {
      throw new HttpException('Coupon Not Found', 404);
    }
    return couponData;
  }

  async update(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    const existingUser = await this.findOne(id);
    const couponData = this.couponRepository.merge(
      existingUser,
      updateCouponDto,
    );
    return await this.couponRepository.save(couponData);
  }

  async remove(id: string): Promise<Coupon> {
    const existingUser = await this.findOne(id);
    return await this.couponRepository.remove(existingUser);
  }
}
