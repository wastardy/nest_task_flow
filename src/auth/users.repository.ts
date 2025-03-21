import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import errorConstants from '../constants/error.constants';
import successConstants from '../constants/success.constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  private usersRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.usersRepository = this.dataSource.getRepository(User);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
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

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      return this.usersRepository.findOneBy({ username });
    } catch (error) {
      throw new UnauthorizedException(errorConstants.INVALID_CREDENTIALS);
    }
  }
}
