import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Task } from 'src/db/entities/task.entity';
import { User } from 'src/db/entities/user.entity';
import { CreateTaskDto } from 'src/dtos/task/create.dto';
import { UpdateTaskDto } from 'src/dtos/task/update.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAllTask(user: User): Promise<Task[]> {
    return await this.createQueryBuilder('tasks')
      .where('userId = :userId', {
        userId: user.id,
      })
      .orderBy('createdAt', 'DESC')
      .getMany();
  }

  async getTask(id: number, user: User): Promise<Task> {
    const task = await this.createQueryBuilder('tasks')
      .where('tasks.id = :id and tasks.userId = :userId', {
        id,
        userId: user.id,
      })
      .getOneOrFail();

    if (!task) {
      throw new NotFoundException(`Task with id:${id} not found.`);
    }
    return task;
  }

  async createTask(body: CreateTaskDto, user: User): Promise<Task> {
    try {
      const { title, description, status } = body;
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = status;
      task.user = user;
      await task.save();
      delete task.user;
      return task;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateTask(id: number, body: UpdateTaskDto, user: User): Promise<Task> {
    try {
      const { title, description, status } = body;
      const task = await this.getTask(id, user);
      task.title = title;
      task.description = description;
      task.status = status;
      await task.save();
      return task;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTask(
    id: number,
    user: User,
  ): Promise<void | { message: string }> {
    let response = await this.createQueryBuilder('tasks')
      .delete()
      .where('id = :id AND userId = :userId', { id: id, userId: user.id })
      .execute();

    if (response.affected === 0) {
      throw new NotFoundException(`Task with id:${id} not found.`);
    } else if (response.affected !== 0) {
      return {
        message: 'Task deleted successfully',
      };
    }

    return;
  }
}
