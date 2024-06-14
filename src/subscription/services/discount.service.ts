import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from '../entities';
import { Repository } from 'typeorm';
import { CreateDiscountDto, UpdateDiscountDto } from '../dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const discountData =
      await this.discountRepository.create(createDiscountDto);
    return this.discountRepository.save(discountData);
  }

  async findAll(): Promise<Discount[]> {
    return await this.discountRepository.find();
  }

  async findOne(id: string): Promise<Discount> {
    const discountData = await this.discountRepository.findOneBy({ id });
    if (!discountData) {
      throw new HttpException('Discount Not Found', 404);
    }
    return discountData;
  }

  async update(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    const existingDiscount = await this.findOne(id);
    const discountData = this.discountRepository.merge(
      existingDiscount,
      updateDiscountDto,
    );
    return await this.discountRepository.save(discountData);
  }

  async remove(id: string): Promise<Discount> {
    const existingDiscount = await this.findOne(id);
    return await this.discountRepository.remove(existingDiscount);
  }
}
