import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task } from 'src/db/entities/task.entity';
import { User } from 'src/db/entities/user.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateTaskDto } from 'src/dtos/task/create.dto';
import { UpdateTaskDto } from 'src/dtos/task/update.dto';
import { TaskApiService } from './task-api.service';

@Controller('task-api')
@UseGuards(AuthGuard())
export class TaskApiController {
  constructor(private readonly taskApiService: TaskApiService) {}

  @Get()
  async findAll(@GetUser() user: User): Promise<Task[]> {
    return await this.taskApiService.findAll(user);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.taskApiService.findOne(id, user);
  }

  @Post('/create')
  async create(
    @Body(ValidationPipe) body: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.taskApiService.create(body, user);
  }

  @Patch('/update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.taskApiService.update(id, body, user);
  }

  @Delete('/delete/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void | { message: string }> {
    return await this.taskApiService.delete(id, user);
  }
}
