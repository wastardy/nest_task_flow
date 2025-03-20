import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from 'src/enums/task.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServise: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksServise.getTasksWithFilters(filterDto);
    } else {
      return this.tasksServise.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksServise.getTaskById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksServise.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksServise.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(id: string): void {
    this.tasksServise.deleteTask(id);
  }
}
