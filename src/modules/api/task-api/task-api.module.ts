import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from 'src/repositories/task.repository';
import { AuthApiModule } from '../auth-api/auth-api.module';
import { TaskApiController } from './task-api.controller';
import { TaskApiService } from './task-api.service';

@Module({
  controllers: [TaskApiController],
  providers: [TaskApiService],
  imports:[TypeOrmModule.forFeature([TaskRepository]), AuthApiModule]
})
export class TaskApiModule {}
