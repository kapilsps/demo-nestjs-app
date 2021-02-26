import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/db/entities/task.entity';
import { User } from 'src/db/entities/user.entity';
import { CreateTaskDto } from 'src/dtos/task/create.dto';
import { UpdateTaskDto } from 'src/dtos/task/update.dto';
import { TaskRepository } from 'src/repositories/task.repository';

@Injectable()
export class TaskApiService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async findAll(user: User): Promise<Task[]> {
    return await this.taskRepository.getAllTask(user);
  }

  async findOne(id: number, user: User): Promise<Task> {
    return await this.taskRepository.getTask(id, user);
  }

  async create(body: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(body, user);
  }

  async update(id: number, body: UpdateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.updateTask(id, body, user);
  }

  async delete(id: number, user: User): Promise<void | { message: string }> {
    return await this.taskRepository.deleteTask(id, user);
  }
}
