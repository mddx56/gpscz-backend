import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from '../entities';
import { Repository } from 'typeorm';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const deviceData = await this.deviceRepository.create(createDeviceDto);
    return this.deviceRepository.save(deviceData);
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceRepository.find();
  }

  async findOne(id: number): Promise<Device> {
    const deviceData = await this.deviceRepository.findOneBy({ id });
    if (!deviceData) {
      throw new HttpException('Device Not Found', 404);
    }
    return deviceData;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const existingDevice = await this.findOne(+id);
    const deviceData = this.deviceRepository.merge(
      existingDevice,
      updateDeviceDto,
    );
    return await this.deviceRepository.save(deviceData);
  }

  async remove(id: string): Promise<Device> {
    const existingDevice = await this.findOne(+id);
    return await this.deviceRepository.remove(existingDevice);
  }
}
