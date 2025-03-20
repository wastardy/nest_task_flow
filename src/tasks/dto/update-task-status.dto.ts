/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum } from 'class-validator';
import { TaskStatus } from 'src/enums/task.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
