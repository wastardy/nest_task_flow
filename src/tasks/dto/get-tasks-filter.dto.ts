import { TaskStatus } from 'src/enums/task.enum';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
