import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geofence } from '../entities';
import { Repository } from 'typeorm';
import { CreateGeofenceDto, UpdateGeofenceDto } from '../dto';

@Injectable()
export class GeofenceService {
  constructor(
    @InjectRepository(Geofence)
    private readonly geofenceRepository: Repository<Geofence>,
  ) {}

  async create(createGeofenceDto: CreateGeofenceDto): Promise<Geofence> {
    const geofenceData =
      await this.geofenceRepository.create(createGeofenceDto);
    return this.geofenceRepository.save(geofenceData);
  }

  async findAll(): Promise<Geofence[]> {
    return await this.geofenceRepository.find();
  }

  async findOne(id: string): Promise<Geofence> {
    const geofenceData = await this.geofenceRepository.findOneBy({ id });
    if (!geofenceData) {
      throw new HttpException('Geofence Not Found', 404);
    }
    return geofenceData;
  }

  async update(
    id: string,
    updateGeofenceDto: UpdateGeofenceDto,
  ): Promise<Geofence> {
    const existingGeofence = await this.findOne(id);
    const geofenceData = this.geofenceRepository.merge(
      existingGeofence,
      updateGeofenceDto,
    );
    return await this.geofenceRepository.save(geofenceData);
  }

  async remove(id: string): Promise<Geofence> {
    const existingGeofence = await this.findOne(id);
    return await this.geofenceRepository.remove(existingGeofence);
  }
}
