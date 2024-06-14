import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ModelService } from '../services';
import { CreateModelDto, UpdateModelDto } from '../dto';

@Controller('models')
export class ModelController {
  constructor(private readonly makeService: ModelService) {}

  @Post()
  async create(@Body() createUserDto: CreateModelDto) {
    try {
      await this.makeService.create(createUserDto);

      return {
        success: true,
        message: 'Model Created Successfully',
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
      const data = await this.makeService.findAll();
      return {
        success: true,
        data,
        message: 'Model Fetched Successfully',
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
      const data = await this.makeService.findOne(id);
      return {
        success: true,
        data,
        message: 'Model Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateModelDto) {
    try {
      await this.makeService.update(id, updateUserDto);
      return {
        success: true,
        message: 'Model Updated Successfully',
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
      await this.makeService.remove(id);
      return {
        success: true,
        message: 'Model Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
