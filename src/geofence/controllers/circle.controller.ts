import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCircleDto, UpdateCircleDto } from '../dto';
import { CircleService } from '../services';

@Controller('circles')
export class CircleController {
  constructor(private readonly circleService: CircleService) {}

  @Post()
  async create(@Body() createCircleDto: CreateCircleDto) {
    try {
      await this.circleService.create(createCircleDto);

      return {
        success: true,
        message: 'Circle Created Successfully',
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
      const data = await this.circleService.findAll();
      return {
        success: true,
        data,
        message: 'Circle Fetched Successfully',
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
      const data = await this.circleService.findOne(id);
      return {
        success: true,
        data,
        message: 'Circle Fetched Successfully',
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
    @Body() updateCircleDto: UpdateCircleDto,
  ) {
    try {
      await this.circleService.update(id, updateCircleDto);
      return {
        success: true,
        message: 'Circle Updated Successfully',
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
      await this.circleService.remove(id);
      return {
        success: true,
        message: 'Circle Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
