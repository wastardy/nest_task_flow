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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksServise: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.tasksServise.getTasksWithFilters(filterDto);
    } else {
      return this.tasksServise.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksServise.getTaskById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksServise.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  @UsePipes(ValidationPipe)
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;

    return this.tasksServise.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void> {
    await this.tasksServise.deleteTaskById(id);
  }
}
