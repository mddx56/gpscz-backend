import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from '../entities';
import { CreateVehicleDto, UpdateVehicleTypeDto } from '../dto';

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleType)
    private readonly vehicletypeRepository: Repository<VehicleType>,
  ) {}

  async create(createMakeDto: CreateVehicleDto): Promise<VehicleType> {
    const makeData = await this.vehicletypeRepository.create(createMakeDto);
    return this.vehicletypeRepository.save(makeData);
  }

  async findAll(): Promise<VehicleType[]> {
    return await this.vehicletypeRepository.find();
  }

  async findOne(id: string): Promise<VehicleType> {
    const userData = await this.vehicletypeRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('Vehicle type Not Found', 404);
    }
    return userData;
  }

  async update(
    id: string,
    updateMakeDto: UpdateVehicleTypeDto,
  ): Promise<VehicleType> {
    const existingUser = await this.findOne(id);
    const userData = this.vehicletypeRepository.merge(
      existingUser,
      updateMakeDto,
    );
    return await this.vehicletypeRepository.save(userData);
  }

  async remove(id: string): Promise<VehicleType> {
    const existingUser = await this.findOne(id);
    return await this.vehicletypeRepository.remove(existingUser);
  }
}
