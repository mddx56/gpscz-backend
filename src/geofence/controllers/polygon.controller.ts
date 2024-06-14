import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePolygonDto, UpdatePolygonDto } from '../dto';
import { PolygonService } from '../services';

@Controller('polygons')
export class PolygonController {
  constructor(private readonly polygonService: PolygonService) {}

  @Post()
  async create(@Body() createPolygonDto: CreatePolygonDto) {
    try {
      await this.polygonService.create(createPolygonDto);

      return {
        success: true,
        message: 'Polygon Created Successfully',
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
      const data = await this.polygonService.findAll();
      return {
        success: true,
        data,
        message: 'Polygon Fetched Successfully',
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
      const data = await this.polygonService.findOne(id);
      return {
        success: true,
        data,
        message: 'Polygon Fetched Successfully',
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
    @Body() updatePolygonDto: UpdatePolygonDto,
  ) {
    try {
      await this.polygonService.update(id, updatePolygonDto);
      return {
        success: true,
        message: 'Polygon Updated Successfully',
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
      await this.polygonService.remove(id);
      return {
        success: true,
        message: 'Polygon Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
