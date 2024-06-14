import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { Profile, User } from './entities';
import { AuthService } from './services/auth.service';
import { ProfileController } from './controllers';
import { ProfileService } from './services';

@Module({
  controllers: [AuthController, ProfileController],
  providers: [AuthService, ProfileService],
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRY,
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
