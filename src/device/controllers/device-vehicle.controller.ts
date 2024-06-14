import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDeviceVehicleDto, UpdateDeviceVehicleDto } from '../dto';
import { DeviceVehicleService } from '../services';

@Controller('devicevehiclevehicles')
export class DeviceVehicleController {
  constructor(private readonly devicevehicleService: DeviceVehicleService) {}

  @Post()
  async create(@Body() createDeviceVehicleDto: CreateDeviceVehicleDto) {
    try {
      await this.devicevehicleService.create(createDeviceVehicleDto);

      return {
        success: true,
        message: 'DeviceVehicle Created Successfully',
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
      const data = await this.devicevehicleService.findAll();
      return {
        success: true,
        data,
        message: 'DeviceVehicle Fetched Successfully',
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
      const data = await this.devicevehicleService.findOne(id);
      return {
        success: true,
        data,
        message: 'DeviceVehicle Fetched Successfully',
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
    @Body() updateDeviceVehicleDto: UpdateDeviceVehicleDto,
  ) {
    try {
      await this.devicevehicleService.update(id, updateDeviceVehicleDto);
      return {
        success: true,
        message: 'DeviceVehicle Updated Successfully',
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
      await this.devicevehicleService.remove(id);
      return {
        success: true,
        message: 'DeviceVehicle Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
