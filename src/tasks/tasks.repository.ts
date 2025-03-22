import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from 'src/enums/task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import errorConstants from 'src/constants/error.constants';
import { Logger } from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository', { timestamp: true });

  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getAllTasks(user: User): Promise<Task[]> {
    return this.find({ where: { user } });
  }

  async getTasksWithFilters(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) ILIKE LOWER(:search) OR LOWER(task.description) ILIKE LOWER(:search))',
        { search: `%${search}%` }, // `%` додає підтримку часткового збігу
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${user.username}.\n` +
          `Filters: ${JSON.stringify(filterDto)}.\n` +
          `Error stacktrace: ${error.stacktrace}\n`,
      );
      throw new InternalServerErrorException(errorConstants.TASK_NOT_FOUND);
    }
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const foundTask = await this.findOne({ where: { id, user } });

    if (!foundTask) {
      throw new NotFoundException(errorConstants.TASK_NOT_FOUND);
    }

    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    try {
      await this.save(task);
      return task;
    } catch (error) {
      throw new InternalServerErrorException(errorConstants.TASK_NOT_CREATED);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.save(task);

    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(errorConstants.TASK_NOT_FOUND);
    }
  }
}
