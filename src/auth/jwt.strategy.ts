import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './users.repository';
import { TokenProvider } from '../config/providers/token.provider';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import errorConstants from '../constants/error.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private tokenProvider: TokenProvider,
  ) {
    super({
      secretOrKey: tokenProvider.getJwtSecretKey(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id, username } = payload;
    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException(errorConstants.USER_NOT_FOUND);
    }

    return user;
  }
}
