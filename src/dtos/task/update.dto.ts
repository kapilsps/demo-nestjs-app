import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { TaskStatus } from 'src/enums/task-status.enum';

export class UpdateTaskDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsIn([TaskStatus.OPEN, TaskStatus.CLOSE, TaskStatus.IN_PROGRESS])
  status: TaskStatus;
}
