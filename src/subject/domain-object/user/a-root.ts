// eslint-disable-next-line max-classes-per-file
import { AggregateRoot } from 'rilata2/src/domain/domain-object/aggregate-root';
import { Algorithm, sign } from 'jsonwebtoken';
import crypto, { randomBytes } from 'crypto';
import { failure } from 'rilata2/src/common/result/failure';
import { dodUtility } from 'rilata2/src/common/utils/domain-object/dod-utility';
import { Result } from 'rilata2/src/common/result/types';
import { success } from 'rilata2/src/common/result/success';
import {
  AuthentificationUserDomainQuery,
  JWTPayload,
  JwtTokens,
  TelegramDateNotValidError,
  TelegramHashNotValidError,
} from '../../domain-data/user/user-authentification.a-params';
import { UserAttrs, UserMeta, UserParams } from '../../domain-data/user/params';
import { TG_AUTH_HASH_LIFETIME_AS_SECONDS } from '../../subject-config';

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
  Result<TelegramHashNotValidError | TelegramDateNotValidError, JwtTokens> {
    const result = this.isValidHash(authQuery);

    if (result.isFailure()) {
      return failure(result.value);
    }

    const jwtToken = this.generateJwtToken(authQuery);
    return success(jwtToken);
  }

  private isValidHash(authQuery: AuthentificationUserDomainQuery):
   Result<TelegramHashNotValidError | TelegramDateNotValidError, true> {
    const receivedHash = authQuery.telegramAuthDto.hash;
    const secret = crypto.createHash('sha256').update(authQuery.botToken).digest();
    const rawData = Object
      .entries(authQuery.telegramAuthDto)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, value]) => key !== 'hash')
      .map(([key, value]) => `${key}=${value}`)
      .sort()
      .join('\n');
    const calcHash = crypto.createHmac('sha256', secret).update(rawData).digest('hex');
    if (receivedHash !== calcHash) {
      return failure(dodUtility.getDomainErrorByType<TelegramHashNotValidError>(
        'TelegramHashNotValidError',
        'Хэш телеграмма некорректный',
        { hash: authQuery.telegramAuthDto.hash },
      ));
    }

    const nowTimeStamp = this.getNowDate().getTime();
    const hashLifeTimeAsMilliSeconds = nowTimeStamp - Number(authQuery.telegramAuthDto.auth_date);
    const hashLifeTimeIsValid = (
      hashLifeTimeAsMilliSeconds - (TG_AUTH_HASH_LIFETIME_AS_SECONDS * 1000)
    );

    if (hashLifeTimeIsValid) {
      return success(true);
    }

    return failure(dodUtility.getDomainErrorByType<TelegramDateNotValidError>(
      'TelegramAuthDateNotValidError',
      'Прошло больше {{authHashLifetimeAsSeconds}} секунд после получения кода авторизации в телеграм. Повторите процедуру авторизации еще раз.',
      { authHashLifetimeAsSeconds: TG_AUTH_HASH_LIFETIME_AS_SECONDS },
    ));
  }

  private generateJwtToken(authQuery: AuthentificationUserDomainQuery): JwtTokens {
    const tokenData: JWTPayload = {
      userId: this.attrs.userId,
      telegramId: this.attrs.telegramId,
      employeeId: this.attrs.employerId,
    };
    console.log(authQuery.jwtTokenGeneratePrivateKey);
    function getJWTPrivateKey(): string {
      return authQuery.jwtTokenGeneratePrivateKey as string;
    }
    async function generateToken(
      payload: PlainJWTPayload<LiteralRecord>,
      expiresIn = '10h',
      algorithm: Algorithm = 'RS512',
    ): Promise<string> {
      return sign(
        {
          tokenType: payload.tokenType,
          payload: payload.payload,
        },
        getJWTPrivateKey(),
        {
          algorithm,
          expiresIn,
        },
      );
    }
  }

  getNowDate(): Date {
    return new Date();
  }
}
