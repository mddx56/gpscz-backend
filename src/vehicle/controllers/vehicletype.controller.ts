import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VehicleTypeService } from '../services';
import { CreateVehicleTypeDto, UpdateVehicleTypeDto } from '../dto';

@Controller('vehicletypes')
export class VehicleTypeController {
  constructor(private readonly vehicletypeService: VehicleTypeService) {}

  @Post()
  async create(@Body() createUserDto: CreateVehicleTypeDto) {
    try {
      await this.vehicletypeService.create(createUserDto);

      return {
        success: true,
        message: 'Vehicle Type Created Successfully',
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
      const data = await this.vehicletypeService.findAll();
      return {
        success: true,
        data,
        message: 'Vehicle Type Fetched Successfully',
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
      const data = await this.vehicletypeService.findOne(id);
      return {
        success: true,
        data,
        message: 'Vehicle Type Fetched Successfully',
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
    @Body() updateUserDto: UpdateVehicleTypeDto,
  ) {
    try {
      await this.vehicletypeService.update(id, updateUserDto);
      return {
        success: true,
        message: 'Vehicle Type Updated Successfully',
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
      await this.vehicletypeService.remove(id);
      return {
        success: true,
        message: 'Vehicle Type Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
