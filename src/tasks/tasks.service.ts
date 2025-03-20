import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from 'src/enums/task.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task) => task.id === id) as Task;

    if (!foundTask)
      throw new NotFoundException(`Task with ID "${id}" not found`);

    return foundTask;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

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

  updateTaskStatus(id: string, newStatus: TaskStatus): Task {
    const taskToUpdate = this.getTaskById(id);
    taskToUpdate.status = newStatus;

    return taskToUpdate;
  }

  deleteTask(idToDelete: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== idToDelete);
  }
}
