import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDiscountDto, UpdateDiscountDto } from '../dto';
import { DiscountService } from '../services';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    try {
      await this.discountService.create(createDiscountDto);

      return {
        success: true,
        message: 'Discount Created Successfully',
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
      const data = await this.discountService.findAll();
      return {
        success: true,
        data,
        message: 'Discount Fetched Successfully',
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
      const data = await this.discountService.findOne(id);
      return {
        success: true,
        data,
        message: 'Discount Fetched Successfully',
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
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    try {
      await this.discountService.update(id, updateDiscountDto);
      return {
        success: true,
        message: 'Discount Updated Successfully',
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
      await this.discountService.remove(id);
      return {
        success: true,
        message: 'Discount Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
