import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto';
import { DeviceService } from '../services';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    try {
      await this.deviceService.create(createDeviceDto);

      return {
        success: true,
        message: 'Device Created Successfully',
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
      const data = await this.deviceService.findAll();
      return {
        success: true,
        data,
        message: 'Device Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const data = await this.deviceService.findOne(id);
      return {
        success: true,
        data,
        message: 'Device Fetched Successfully',
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
    @Param('id') id: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    try {
      await this.deviceService.update(id, updateDeviceDto);
      return {
        success: true,
        message: 'Device Updated Successfully',
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
      await this.deviceService.remove(id);
      return {
        success: true,
        message: 'Device Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
