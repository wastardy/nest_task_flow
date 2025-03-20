import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from 'src/enums/task.enum';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      // id: Date.now().toString(36) + Math.random().toString().slice(2),
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
