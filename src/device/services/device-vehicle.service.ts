import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceVehicleDto, UpdateDeviceVehicleDto } from '../dto';
import { DeviceVehicle } from '../entities';

@Injectable()
export class DeviceVehicleService {
  constructor(
    @InjectRepository(DeviceVehicle)
    private readonly deviceVehicleRepository: Repository<DeviceVehicle>,
  ) {}

  async create(
    createDeviceVehicleDto: CreateDeviceVehicleDto,
  ): Promise<DeviceVehicle> {
    const devVehData = await this.deviceVehicleRepository.create(
      createDeviceVehicleDto,
    );
    return this.deviceVehicleRepository.save(devVehData);
  }

  async findAll(): Promise<DeviceVehicle[]> {
    return await this.deviceVehicleRepository.find();
  }

  async findOne(vehicle_id: string): Promise<DeviceVehicle> {
    const devVehData = await this.deviceVehicleRepository.findOneBy({
      vehicle_id,
    });
    if (!devVehData) {
      throw new HttpException('DeviceVehicle Not Found', 404);
    }
    return devVehData;
  }

  async update(
    id: string,
    updateDevVehiDto: UpdateDeviceVehicleDto,
  ): Promise<DeviceVehicle> {
    const existingDevice = await this.findOne(id);
    const devVehData = this.deviceVehicleRepository.merge(
      existingDevice,
      updateDevVehiDto,
    );
    return await this.deviceVehicleRepository.save(devVehData);
  }

  async remove(id: string): Promise<DeviceVehicle> {
    const existingDevice = await this.findOne(id);
    return await this.deviceVehicleRepository.remove(existingDevice);
  }
}
