import { InjectRepository } from '@nestjs/typeorm';
import { Point, Repository } from 'typeorm';
import { Position } from '../entities';
import { CreatePositionDto } from '../dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    try {
      const pointObject: Point = {
        type: 'Point',
        coordinates: [createPositionDto.longitude, createPositionDto.latitude],
      };
      createPositionDto.point = pointObject;
      createPositionDto.dispositivo_id = createPositionDto.id;

      delete createPositionDto.id;
      // return await this.positionRepository.save(createPositionDto)
    } catch (error) {
      this.handleErrorDb(error);
    }
  }

  findAll() {
    return this.positionRepository.find();
  }

  findOne(id: number) {
    return this.positionRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.positionRepository.delete(id);
  }

  private handleErrorDb(error: any): never {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(error.message, 'algo paso..');
  }
}
