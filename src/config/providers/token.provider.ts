import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import errorConstants from '../../constants/error.constants';

@Injectable()
export class TokenProvider {
  constructor(private configService: ConfigService) {}

  getJwtSecretKey(): string {
    const secretKey = this.configService.get<string>('JWT_SECRET_KEY');

    if (!secretKey) {
      throw new Error(errorConstants.INVALID_TOKEN);
    }

    // const payload = { userId: 1 };
    // const options = { expiresIn: '1h' };

    // return jwt.sign(payload, secretKey, options);

    return secretKey;
  }
}
