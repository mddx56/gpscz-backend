import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCouponDto, UpdateCouponDto } from '../dto';
import { CouponService } from '../services';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto) {
    try {
      await this.couponService.create(createCouponDto);

      return {
        success: true,
        message: 'Coupon Created Successfully',
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
      const data = await this.couponService.findAll();
      return {
        success: true,
        data,
        message: 'Coupon Fetched Successfully',
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
      const data = await this.couponService.findOne(id);
      return {
        success: true,
        data,
        message: 'Coupon Fetched Successfully',
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
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    try {
      await this.couponService.update(id, updateCouponDto);
      return {
        success: true,
        message: 'Coupon Updated Successfully',
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
      await this.couponService.remove(id);
      return {
        success: true,
        message: 'Coupon Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
