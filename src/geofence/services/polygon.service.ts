import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Polygon } from '../entities';
import { Repository } from 'typeorm';
import { CreatePolygonDto, UpdatePolygonDto } from '../dto';

@Injectable()
export class PolygonService {
  constructor(
    @InjectRepository(Polygon)
    private readonly polygonRepository: Repository<Polygon>,
  ) {}

  async create(createPolygonDto: CreatePolygonDto): Promise<Polygon> {
    const polygonData = await this.polygonRepository.create(createPolygonDto);
    return this.polygonRepository.save(polygonData);
  }

  async findAll(): Promise<Polygon[]> {
    return await this.polygonRepository.find();
  }

  async findOne(id: string): Promise<Polygon> {
    const polygonData = await this.polygonRepository.findOneBy({ id });
    if (!polygonData) {
      throw new HttpException('Polygon Not Found', 404);
    }
    return polygonData;
  }

  async update(
    id: string,
    updatePolygonDto: UpdatePolygonDto,
  ): Promise<Polygon> {
    const existingPolygon = await this.findOne(id);
    const polygonData = this.polygonRepository.merge(
      existingPolygon,
      updatePolygonDto,
    );
    return await this.polygonRepository.save(polygonData);
  }

  async remove(id: string): Promise<Polygon> {
    const existingPolygon = await this.findOne(id);
    return await this.polygonRepository.remove(existingPolygon);
  }
}
