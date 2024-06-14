import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '../entities';
import { Repository } from 'typeorm';
import { CreatePlanDto, UpdatePlanDto } from '../dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async create(createMakeDto: CreatePlanDto): Promise<Plan> {
    const makeData = await this.planRepository.create(createMakeDto);
    return this.planRepository.save(makeData);
  }

  async findAll(): Promise<Plan[]> {
    return await this.planRepository.find();
  }

  async findOne(id: string): Promise<Plan> {
    const planData = await this.planRepository.findOneBy({ id });
    if (!planData) {
      throw new HttpException('Plan Not Found', 404);
    }
    return planData;
  }

  async update(id: string, updateMakeDto: UpdatePlanDto): Promise<Plan> {
    const existingPlan = await this.findOne(id);
    const planData = this.planRepository.merge(existingPlan, updateMakeDto);
    return await this.planRepository.save(planData);
  }

  async remove(id: string): Promise<Plan> {
    const existingPlan = await this.findOne(id);
    return await this.planRepository.remove(existingPlan);
  }
}
