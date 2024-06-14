import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from '../entities';
import { Repository } from 'typeorm';
import { CreateAlarmDto, UpdateAlarmDto } from '../dto';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepository: Repository<Alarm>,
  ) {}

  async create(createAlarmDto: CreateAlarmDto): Promise<Alarm> {
    const alarmData = await this.alarmRepository.create(createAlarmDto);
    return this.alarmRepository.save(alarmData);
  }

  async findAll(): Promise<Alarm[]> {
    return await this.alarmRepository.find();
  }

  async findOne(id: string): Promise<Alarm> {
    const alarmData = await this.alarmRepository.findOneBy({ id });
    if (!alarmData) {
      throw new HttpException('Alarm Not Found', 404);
    }
    return alarmData;
  }

  async update(id: string, updateAlarmDto: UpdateAlarmDto): Promise<Alarm> {
    const existingAlarm = await this.findOne(id);
    const alarmData = this.alarmRepository.merge(existingAlarm, updateAlarmDto);
    return await this.alarmRepository.save(alarmData);
  }

  async remove(id: string): Promise<Alarm> {
    const existingAlarm = await this.findOne(id);
    return await this.alarmRepository.remove(existingAlarm);
  }
}
