import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebHookEvent } from '../entities';
import { Repository } from 'typeorm';
import { CreateWebHookEventDto, UpdateWebHookEventDto } from '../dto';

@Injectable()
export class WebHookEventService {
  constructor(
    @InjectRepository(WebHookEvent)
    private readonly webHookEventRepository: Repository<WebHookEvent>,
  ) {}

  async create(
    createWebHookEventDto: CreateWebHookEventDto,
  ): Promise<WebHookEvent> {
    const webHookEventData = await this.webHookEventRepository.create(
      createWebHookEventDto,
    );
    return this.webHookEventRepository.save(webHookEventData);
  }

  async findAll(): Promise<WebHookEvent[]> {
    return await this.webHookEventRepository.find();
  }

  async findOne(id: string): Promise<WebHookEvent> {
    const webHookEventData = await this.webHookEventRepository.findOneBy({
      id,
    });
    if (!webHookEventData) {
      throw new HttpException('WebHookEvent Not Found', 404);
    }
    return webHookEventData;
  }

  async update(
    id: string,
    updateWebHookEventDto: UpdateWebHookEventDto,
  ): Promise<WebHookEvent> {
    const existingwebHookEvent = await this.findOne(id);
    const webHookEventData = this.webHookEventRepository.merge(
      existingwebHookEvent,
      updateWebHookEventDto,
    );
    return await this.webHookEventRepository.save(webHookEventData);
  }

  async remove(id: string): Promise<WebHookEvent> {
    const existingwebHookEvent = await this.findOne(id);
    return await this.webHookEventRepository.remove(existingwebHookEvent);
  }
}
