import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import { LoginDto } from 'src/dtos/auth/login.dto';
import { RegisterDto } from 'src/dtos/auth/register.dto';
import { LoginSuccess } from 'src/models/login-success.model';
import { AuthApiService } from './auth-api.service';

@Controller('auth-api')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  /**
   * Register the user
   * @param body
   */
  @Post('/register')
  async register(@Body(ValidationPipe) body: RegisterDto): Promise<User> {
    return await this.authApiService.register(body);
  }

  /**
   * Login the user
   * @param body
   */
  @Post('/login')
  async login(@Body(ValidationPipe) body: LoginDto): Promise<LoginSuccess> {
    return await this.authApiService.login(body);
  }

  /**
   * Logout the user
   */
  @Get('/logout')
  logout() {
    return this.authApiService.logout();
  }
}
