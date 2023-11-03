// eslint-disable-next-line max-classes-per-file
import { AggregateRoot } from 'rilata2/src/domain/domain-object/aggregate-root';
import * as jwt from 'jsonwebtoken';
import crypto, { randomBytes } from 'crypto';
import { failure } from 'rilata2/src/common/result/failure';
import { dodUtility } from 'rilata2/src/common/utils/domain-object/dod-utility';
import {
  AuthentificationUserDomainQuery,
  JwtAccessData,
  JwtTokens,
  TelegramDateNotValidError,
  TelegramHashNotValidError,
} from '../../domain-data/user/user-authentification.a-params';
import { UserAttrs, UserMeta, UserParams } from '../../domain-data/user/params';

const telegramAuthHashLifetimeAsSeconds = 7 * 24 * 60 * 60;

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

  userAuthentification(authQuery: AuthentificationUserDomainQuery): 
  JwtTokens | TelegramHashNotValidError | TelegramDateNotValidError {
    const validationError = this.isValidUser(authQuery);

    if (validationError) {
      return validationError; // Вернуть объект ошибки
    }

    const jwtToken = this.generateJwtToken(authQuery);
    return jwtToken;
  }

  private isValidUser(authQuery: AuthentificationUserDomainQuery):
   TelegramHashNotValidError | TelegramDateNotValidError | null {
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
      throw failure(dodUtility.getDomainErrorByType<TelegramHashNotValidError>(
        'TelegramHashNotValidError',
        'Хэш телеграмма некорректный',
        { hash },
      ));
    }

    const authHashLifetimeAsSeconds = Math.floor(Date.now() / 1000);
    const validAuthDate = authHashLifetimeAsSeconds - telegramAuthHashLifetimeAsSeconds;
    const authDateNumber = parseInt(auth_date, 10);

    if (authDateNumber <= validAuthDate) {
      throw failure(dodUtility.getDomainErrorByType<TelegramDateNotValidError>(
        'TelegramAuthDateNotValidError',
        'Прошло больше {{authHashLifetimeAsSeconds}} секунд после получения кода авторизации в телеграм. Повторите процедуру авторизации еще раз.',
        { authHashLifetimeAsSeconds },
      ));
    }

    return null;
  }

  generateJwtToken(authQuery: AuthentificationUserDomainQuery): JwtTokens {
    const tokenData: JwtAccessData = {
      userId: authQuery.userAttrs.userId,
      telegramId: authQuery.telegramAuthDto.id,
      employeeId: authQuery.userAttrs.employeeId,
    };

    const accessToken = jwt.sign(tokenData, authQuery.privateKey, {
      algorithm: 'RS256',
      expiresIn: '1h',
    });

    const refreshToken = this.generateRefreshToken(tokenData);

    return { accessToken, refreshToken };
  }

  private generateRefreshToken(tokenData: JwtAccessData): string {
    const refreshSecret = randomBytes(32).toString('hex');
    const refreshToken = jwt.sign(tokenData, refreshSecret, {
      expiresIn: '7d',
    });
    return refreshToken;
  }
}
