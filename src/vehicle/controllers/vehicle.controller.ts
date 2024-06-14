import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VehicleService } from '../services';
import { CreateVehicleDto, UpdateVehicleDto } from '../dto';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() createUserDto: CreateVehicleDto) {
    try {
      await this.vehicleService.create(createUserDto);

      return {
        success: true,
        message: 'Vehicle Created Successfully',
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
      const data = await this.vehicleService.findAll();
      return {
        success: true,
        data,
        message: 'Vehicle Fetched Successfully',
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
      const data = await this.vehicleService.findOne(id);
      return {
        success: true,
        data,
        message: 'Vehicle Fetched Successfully',
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
    @Body() updateUserDto: UpdateVehicleDto,
  ) {
    try {
      await this.vehicleService.update(id, updateUserDto);
      return {
        success: true,
        message: 'Vehicle Updated Successfully',
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
      await this.vehicleService.remove(id);
      return {
        success: true,
        message: 'Vehicle Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
