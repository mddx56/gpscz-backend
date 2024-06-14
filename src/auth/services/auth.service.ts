import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as byc from 'bcrypt';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto, LoginUserDto } from '../dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: byc.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleErrorDb(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { username, password } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { username },
        select: { username: true, password: true, id: true },
      });

      if (!user) throw new UnauthorizedException('Crendiales no son validas..');

      if (!byc.compareSync(password, user.password))
        throw new UnauthorizedException('La contraseña invalida');

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleErrorDb(error);
    }
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleErrorDb(error: any): never {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(error.message, 'algo paso..');
  }
}
