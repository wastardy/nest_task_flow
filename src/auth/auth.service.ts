import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import errorConstants from 'src/constants/error.constants';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException(errorConstants.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(errorConstants.INVALID_CREDENTIALS);
    }

    const payload: JwtPayload = { id: user.id, username: user.username };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
