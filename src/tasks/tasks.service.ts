import { Injectable } from '@nestjs/common';
import { TaskStatus } from 'src/enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(user: User): Promise<Task[]> {
    return this.taskRepository.getAllTasks(user);
  }
  async getTasksWithFilters(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.taskRepository.getTasksWithFilters(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return this.taskRepository.getTaskById(id, user);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: string,
    newStatus: TaskStatus,
    user: User,
  ): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, newStatus, user);
  }

  async deleteTaskById(idToDelete: string): Promise<void> {
    await this.taskRepository.deleteTaskById(idToDelete);
  }
}
