import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto, UpdateProfileDto } from '../dto';
import { Profile } from '../entities';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const makeData = await this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(makeData);
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }

  async findOne(id: string): Promise<Profile> {
    const userData = await this.profileRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('Profile Not Found', 404);
    }
    return userData;
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const existingProfile = await this.findOne(id);
    const userData = this.profileRepository.merge(
      existingProfile,
      updateProfileDto,
    );
    return await this.profileRepository.save(userData);
  }

  async remove(id: string): Promise<Profile> {
    const existingProfile = await this.findOne(id);
    return await this.profileRepository.remove(existingProfile);
  }
}
