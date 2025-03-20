import { Injectable } from '@nestjs/common';
import { TaskStatus } from 'src/enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }
  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasksWithFilters(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: string, newStatus: TaskStatus): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, newStatus);
  }

  async deleteTaskById(idToDelete: string): Promise<void> {
    await this.taskRepository.deleteTaskById(idToDelete);
  }
}
