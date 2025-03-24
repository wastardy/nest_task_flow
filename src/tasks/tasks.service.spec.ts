import { Test } from '@nestjs/testing';
import { TaskRepository } from '../tasks/tasks.repository';
import { TasksService } from '../tasks/tasks.service';
import passport from 'passport';

const mockTasksRepository = () => ({
  getAllTasks: jest.fn(),
});

const mockUser = {
  id: '12321',
  username: 'Test User',
  password: 'Test Password',
  tasks: [],
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
    it('calls TaskRepository.getTasks and returns the result', async () => {
      tasksRepository.getAllTasks.mockResolvedValue('someValue'); // the way tio deal with promises
      const result = await tasksService.getAllTasks(mockUser);

      expect(result).toEqual('someValue');
    });
  });
});
