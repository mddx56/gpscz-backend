import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAlarmDto, UpdateAlarmDto } from '../dto';
import { AlarmService } from '../services';

@Controller('alarms')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Post()
  async create(@Body() createAlarmDto: CreateAlarmDto) {
    try {
      await this.alarmService.create(createAlarmDto);

      return {
        success: true,
        message: 'Alarm Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.alarmService.findAll();
      return {
        success: true,
        data,
        message: 'Alarm Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.alarmService.findOne(id);
      return {
        success: true,
        data,
        message: 'Alarm Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlarmDto: UpdateAlarmDto,
  ) {
    try {
      await this.alarmService.update(id, updateAlarmDto);
      return {
        success: true,
        message: 'Alarm Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.alarmService.remove(id);
      return {
        success: true,
        message: 'Alarm Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
