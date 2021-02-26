import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { TaskStatus } from 'src/enums/task-status.enum';

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.CLOSE, TaskStatus.IN_PROGRESS])
  status?: TaskStatus;
}
