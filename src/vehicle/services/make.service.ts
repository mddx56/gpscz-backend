import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Make } from '../entities';
import { Repository } from 'typeorm';
import { CreateMakeDto, UpdateMakeDto } from '../dto';

@Injectable()
export class MakeService {
  constructor(
    @InjectRepository(Make)
    private readonly makeRepository: Repository<Make>,
  ) {}

  async create(createMakeDto: CreateMakeDto): Promise<Make> {
    const makeData = await this.makeRepository.create(createMakeDto);
    return this.makeRepository.save(makeData);
  }

  async findAll(): Promise<Make[]> {
    return await this.makeRepository.find();
  }

  async findOne(id: string): Promise<Make> {
    const userData = await this.makeRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('Make Not Found', 404);
    }
    return userData;
  }

  async update(id: string, updateMakeDto: UpdateMakeDto): Promise<Make> {
    const existingUser = await this.findOne(id);
    const userData = this.makeRepository.merge(existingUser, updateMakeDto);
    return await this.makeRepository.save(userData);
  }

  async remove(id: string): Promise<Make> {
    const existingUser = await this.findOne(id);
    return await this.makeRepository.remove(existingUser);
  }
}
