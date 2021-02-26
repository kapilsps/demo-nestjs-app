import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { LoginDto } from 'src/dtos/auth/login.dto';
import { RegisterDto } from 'src/dtos/auth/register.dto';
import { LoginSuccess } from 'src/models/login-success.model';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthApiService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Register the user
   * @param data
   */
  async register(data: RegisterDto): Promise<User> {
    return await this.userRepository.createUser(data);
  }

  /**
   * Login the user
   * @param data
   */
  async login(data: LoginDto): Promise<LoginSuccess> {
    const user = await this.userRepository.findUser(data);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { email: user.email };
    const access_token = this.jwtService.sign(payload);
    return {
      message: 'Login successfully',
      access_token,
    };
  }

  /**
   * Logout the user
   */
  logout() {}
}
