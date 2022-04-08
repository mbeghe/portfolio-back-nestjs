import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from './dtos/create-user.dto';
import { Login } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() payload: Login): Promise<object> {
    return await this.authService.login(payload);
  }

  @Post('/')
  async createUser(@Body() payload: CreateUser): Promise<object> {
    return await this.authService.createUser(payload);
  }
}
