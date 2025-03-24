import { Test } from '@nestjs/testing';
import { TaskRepository } from '../tasks/tasks.repository';
import { TasksService } from '../tasks/tasks.service';
import { TaskStatus } from '../enums/task-status.enum';
import { NotFoundException } from '@nestjs/common';
import errorConstants from '../constants/error.constants';

const mockTasksRepository = () => ({
  getAllTasks: jest.fn(),

  getTasksWithFilters: jest.fn(),

  getTaskById: jest.fn(),
});

const mockUser = {
  id: '12321',
  username: 'Test User',
  password: 'Test Password',
  tasks: [],
};

const taskFilterDto = {
  status: TaskStatus.OPEN,
  search: 'Test',
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls TaskRepository.getAllTasks and returns the result', async () => {
      tasksRepository.getAllTasks.mockResolvedValue('someValue'); // the way tio deal with promises
      const result = await tasksService.getAllTasks(mockUser);

      expect(result).toEqual('someValue');
    });

    it('calls TaskRepository.getTasksWithFilters and returns the result', async () => {
      tasksRepository.getTasksWithFilters.mockResolvedValue(
        'tasks with filter',
      );
      const result = await tasksService.getTasksWithFilters(
        taskFilterDto,
        mockUser,
      );

      expect(result).toEqual('tasks with filter');
    });
  });

  describe('getTaskById', () => {
    it('should return task by particular id', async () => {
      const mockTask = {
        title: 'Test Task Title',
        description: 'Test Task Description',
        id: 'task_id_123',
        status: TaskStatus.OPEN,
      };

      tasksRepository.getTaskById.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('task_id_123', mockUser);

      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      tasksRepository.getTaskById.mockRejectedValue(
        new NotFoundException(errorConstants.TASK_NOT_FOUND),
      );

      await expect(
        tasksService.getTaskById('task_id_123', mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
