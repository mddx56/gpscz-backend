import {
  IsDecimal,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Point } from 'typeorm';

export class CreatePositionDto {
  @IsNumber()
  id: number;

  @IsDecimal()
  longitude: number;

  @IsDecimal()
  latitude: number;

  point: Point;

  @IsNumber()
  dispositivo_id: number;
}
