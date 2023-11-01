// eslint-disable-next-line max-classes-per-file
import { AggregateRoot } from 'rilata2/src/domain/domain-object/aggregate-root';
import * as jwt from 'jsonwebtoken';
import crypto, { randomBytes } from 'crypto';
import {
  AuthentificationUserDomainQuery, JwtAccessData, JwtTokens,
} from '../../domain-data/user/user-authentification.a-params';
import { UserAttrs, UserMeta, UserParams } from '../../domain-data/user/params';

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class UserAR extends AggregateRoot<UserParams> {
  protected attrs: UserAttrs;

  protected version: number;

  constructor(attrs: UserAttrs, version: number) {
    super();
    this.attrs = attrs;
    this.version = version;
  }

  protected getMeta(): UserMeta {
    return {
      name: 'UserAR',
      domainType: 'domain-object',
      objectType: 'aggregate',
    };
  }

  getShortName(): string {
    throw new Error('Method not implemented.');
  }

  userAuthentification(authQuery: AuthentificationUserDomainQuery)
  : JwtTokens | AuthenticationError {
    if (this.isValidUser(authQuery)) {
      const jwtToken = this.generateJwtToken(authQuery);
      return jwtToken;
    }
    throw new Error('Неверные учетные данные');
  }

  private isValidUser(authQuery: AuthentificationUserDomainQuery): boolean {
    const {
      id,
      first_name,
      Last_name,
      username,
      photo_url,
      auth_date,
      hash,
    } = authQuery.telegramAuthDto;
    const computedHash = crypto
      .createHmac('sha256', authQuery.botToken)
      .update(`${id}${first_name}${Last_name}${username}${photo_url}${auth_date}`)
      .digest('hex');
    if (hash !== computedHash) {
      throw new Error('Невалидный хэш телеграмма');
    }
    const currentDate = Math.floor(Date.now() / 1000);
    const validAuthDate = currentDate - 7 * 24 * 60 * 60;
    const authDateNumber = parseInt(auth_date, 10);

    if (authDateNumber <= validAuthDate) {
      throw new Error('auth_date устарел');
    }
    return true;
  }

  private generateJwtToken(authQuery: AuthentificationUserDomainQuery): JwtTokens {
    const tokenData:JwtAccessData = {
      userId: authQuery.userAttrs.userId,
      telegramId: authQuery.telegramAuthDto.id,
      employeeId: authQuery.userAttrs.employeeId,
    };
    const accessToken = jwt.sign(tokenData, authQuery.JWT_SECRET, { expiresIn: '1h' });

    const refreshToken = this.generateRefreshToken(tokenData);

    return { accessToken, refreshToken };
  }

  private generateRefreshToken(tokenData: JwtAccessData): string {
    const refreshSecret = randomBytes(32).toString('hex');
    const refreshToken = jwt.sign(tokenData, refreshSecret, { expiresIn: '7d' });
    return refreshToken;
  }
}
