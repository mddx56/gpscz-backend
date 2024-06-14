import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Circle } from '../entities';
import { Repository } from 'typeorm';
import { CreateCircleDto, UpdateCircleDto } from '../dto';

@Injectable()
export class CircleService {
  constructor(
    @InjectRepository(Circle)
    private readonly circleRepository: Repository<Circle>,
  ) {}

  async create(createCircleDto: CreateCircleDto): Promise<Circle> {
    const circleData = await this.circleRepository.create(createCircleDto);
    return this.circleRepository.save(circleData);
  }

  async findAll(): Promise<Circle[]> {
    return await this.circleRepository.find();
  }

  async findOne(id: string): Promise<Circle> {
    const circleData = await this.circleRepository.findOneBy({ id });
    if (!circleData) {
      throw new HttpException('Circle Not Found', 404);
    }
    return circleData;
  }

  async update(id: string, updateCircleDto: UpdateCircleDto): Promise<Circle> {
    const existingCircle = await this.findOne(id);
    const circleData = this.circleRepository.merge(
      existingCircle,
      updateCircleDto,
    );
    return await this.circleRepository.save(circleData);
  }

  async remove(id: string): Promise<Circle> {
    const existingCircle = await this.findOne(id);
    return await this.circleRepository.remove(existingCircle);
  }
}
