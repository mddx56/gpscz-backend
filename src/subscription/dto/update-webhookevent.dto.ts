import { PartialType } from '@nestjs/swagger';
import { CreateWebHookEventDto } from './create-webhookenvent.dto';

export class UpdateWebHookEventDto extends PartialType(CreateWebHookEventDto) {}
