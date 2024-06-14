import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dto';
import { SubscriptionService } from '../services';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    try {
      await this.subscriptionService.create(createSubscriptionDto);

      return {
        success: true,
        message: 'Subscription Created Successfully',
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
      const data = await this.subscriptionService.findAll();
      return {
        success: true,
        data,
        message: 'Subscription Fetched Successfully',
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
      const data = await this.subscriptionService.findOne(id);
      return {
        success: true,
        data,
        message: 'Subscription Fetched Successfully',
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
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    try {
      await this.subscriptionService.update(id, updateSubscriptionDto);
      return {
        success: true,
        message: 'Subscription Updated Successfully',
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
      await this.subscriptionService.remove(id);
      return {
        success: true,
        message: 'Subscription Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
