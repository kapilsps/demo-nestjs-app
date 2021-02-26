import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { AuthApiController } from './auth-api.controller';
import { AuthApiService } from './auth-api.service';

@Module({
  controllers: [AuthApiController],
  providers: [AuthApiService, JwtStrategy],
  imports:[TypeOrmModule.forFeature([UserRepository]), JwtModule.register({
    secret:'its is top secret',
    signOptions:{
      expiresIn:3600
    }
  }), PassportModule.register({
    defaultStrategy: 'jwt'
  })],
  exports:[JwtStrategy, PassportModule]
})
export class AuthApiModule {}
