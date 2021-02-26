import { Module } from '@nestjs/common';
import { AuthApiModule } from '../auth-api/auth-api.module';
import { UserApiController } from './user-api.controller';
import { UserApiService } from './user-api.service';

@Module({
  controllers: [UserApiController],
  providers: [UserApiService],
  imports:[AuthApiModule]
})
export class UserApiModule {}
