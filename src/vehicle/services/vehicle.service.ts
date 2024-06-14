import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto, UpdateVehicleDto } from '../dto';
import { Vehicle } from '../entities';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const makeData = await this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(makeData);
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find();
  }

  async findOne(id: string): Promise<Vehicle> {
    const userData = await this.vehicleRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('Vehicle Not Found', 404);
    }
    return userData;
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const existingUser = await this.findOne(id);
    const userData = this.vehicleRepository.merge(
      existingUser,
      updateVehicleDto,
    );
    return await this.vehicleRepository.save(userData);
  }

  async remove(id: string): Promise<Vehicle> {
    const existingUser = await this.findOne(id);
    return await this.vehicleRepository.remove(existingUser);
  }
}
