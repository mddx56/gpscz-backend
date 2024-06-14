import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMakeDto, UpdateMakeDto } from '../dto';
import { MakeService } from '../services';

@Controller('makes')
export class MakeController {
  constructor(private readonly makeService: MakeService) {}

  @Post()
  async create(@Body() createUserDto: CreateMakeDto) {
    try {
      await this.makeService.create(createUserDto);

      return {
        success: true,
        message: 'Make Created Successfully',
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
        message: 'Make Fetched Successfully',
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
        message: 'Make Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateMakeDto) {
    try {
      await this.makeService.update(id, updateUserDto);
      return {
        success: true,
        message: 'Make Updated Successfully',
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
        message: 'Make Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
