import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfileService } from '../services';
import { CreateProfileDto, UpdateProfileDto } from '../dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly makeService: ProfileService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    try {
      await this.makeService.create(createProfileDto);

      return {
        success: true,
        message: 'Profile Created Successfully',
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
        message: 'Profile Fetched Successfully',
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
        message: 'Profile Fetched Successfully',
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
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    try {
      await this.makeService.update(id, updateProfileDto);
      return {
        success: true,
        message: 'Profile Updated Successfully',
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
        message: 'Profile Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
