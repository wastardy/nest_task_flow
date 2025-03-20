import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import errorConstants from '../constants/error.constants';

@Injectable()
export class UserRepository {
  private usersRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.usersRepository = this.dataSource.getRepository(User);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.usersRepository.create({
      username,
      password,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(errorConstants.USER_ALREADY_EXIST);
      }
      throw new InternalServerErrorException();
    }
  }
}
