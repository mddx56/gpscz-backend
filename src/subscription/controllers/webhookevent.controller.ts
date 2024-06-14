import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateWebHookEventDto, UpdateWebHookEventDto } from '../dto';
import { WebHookEventService } from '../services';

@Controller('webhook')
export class WebHookEventController {
  constructor(private readonly webHookEventService: WebHookEventService) {}

  @Post()
  create(@Body() createWebHookEventDto: CreateWebHookEventDto) {
    return this.webHookEventService.create(createWebHookEventDto);
  }

  @Get()
  findAll() {
    return this.webHookEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webHookEventService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWebHookEventDto: UpdateWebHookEventDto,
  ) {
    return this.webHookEventService.update(id, updateWebHookEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webHookEventService.remove(id);
  }
}
