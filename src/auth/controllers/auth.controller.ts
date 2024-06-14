import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Auth, GetUser } from '../decorators';
import { CreateUserDto, LoginUserDto } from '../dto';
import { User } from '../entities';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get('logout')
  logout(@Req() req: Request) {}

  @Get('refresh')
  refreshTokens(@Req() req: Request) {}

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.userService.checkAuthStatus(user);
  }
}
