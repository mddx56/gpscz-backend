import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '../entities';
import { Repository } from 'typeorm';
import { UpdateModelDto, CreateModelDto } from '../dto';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createModelDto: CreateModelDto): Promise<Model> {
    const makeData = await this.modelRepository.create(createModelDto);
    return this.modelRepository.save(makeData);
  }

  async findAll(): Promise<Model[]> {
    return await this.modelRepository.find();
  }

  async findOne(id: string): Promise<Model> {
    const userData = await this.modelRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('Model Not Found', 404);
    }
    return userData;
  }

  async update(id: string, updateModelDto: UpdateModelDto): Promise<Model> {
    const existingUser = await this.findOne(id);
    const userData = this.modelRepository.merge(existingUser, updateModelDto);
    return await this.modelRepository.save(userData);
  }

  async remove(id: string): Promise<Model> {
    const existingUser = await this.findOne(id);
    return await this.modelRepository.remove(existingUser);
  }
}
