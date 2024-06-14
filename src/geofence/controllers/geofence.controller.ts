import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGeofenceDto, UpdateGeofenceDto } from '../dto';
import { GeofenceService } from '../services';

@Controller('geofences')
export class GeofenceController {
  constructor(private readonly geofenceService: GeofenceService) {}

  @Post()
  async create(@Body() createGeofenceDto: CreateGeofenceDto) {
    try {
      await this.geofenceService.create(createGeofenceDto);

      return {
        success: true,
        message: 'Geofence Created Successfully',
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
      const data = await this.geofenceService.findAll();
      return {
        success: true,
        data,
        message: 'Geofence Fetched Successfully',
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
      const data = await this.geofenceService.findOne(id);
      return {
        success: true,
        data,
        message: 'Geofence Fetched Successfully',
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
    @Body() updateGeofenceDto: UpdateGeofenceDto,
  ) {
    try {
      await this.geofenceService.update(id, updateGeofenceDto);
      return {
        success: true,
        message: 'Geofence Updated Successfully',
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
      await this.geofenceService.remove(id);
      return {
        success: true,
        message: 'Geofence Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
