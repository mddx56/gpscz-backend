import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from '../dto';
import { User } from '../entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createMotoDto: CreateUserDto) {
    return 'This action adds a new moto';
  }

  findAll() {
    return `This action returns all moto`;
  }

  async findOne(id: string) {
    try {
      let user: User;
      if (isUUID(id)) {
        user = await this.userRepository.findOneBy({ id });
      } else {
      }
    } catch (err) {}
  }

  update(id: number, updateMotoDto: CreateUserDto) {
    return `This action updates a #${id} moto`;
  }

  remove(id: number) {
    return `This action removes a #${id} moto`;
  }
}
