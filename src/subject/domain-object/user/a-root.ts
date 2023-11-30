import { AggregateRoot } from 'rilata2/src/domain/domain-object/aggregate-root';
import crypto from 'crypto';
import { failure } from 'rilata2/src/common/result/failure';
import { dodUtility } from 'rilata2/src/common/utils/domain-object/dod-utility';
import { Result } from 'rilata2/src/common/result/types';
import { success } from 'rilata2/src/common/result/success';
import * as jwt from 'jsonwebtoken';
import { DomainResult } from 'rilata2/src/domain/domain-object-data/aggregate-data-types';
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';
import { ArrayFieldErrors, FieldErrors, ValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import {
  AuthentificationUserActionParams,
  AuthentificationUserDomainQuery,
  JWTPayload,
  JwtTokens,
  TelegramAuthDTO,
  TelegramDateNotValidError,
  TelegramHashNotValidError,
} from '../../domain-data/user/user-authentification.a-params';
import { UserAttrs, UserMeta, UserParams } from '../../domain-data/user/params';
import { TG_AUTH_HASH_LIFETIME_AS_SECONDS } from '../../subject-config';
import { TelegramAuthDTOValidator } from './user-auth-vmap';

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
  DomainResult<AuthentificationUserActionParams> {
    const result = this.isValidHash(authQuery);

    if (result.isFailure()) {
      return failure(result.value);
    }

    const jwtTokens = this.generateJwtToken(authQuery);
    return success(jwtTokens);
  }

  private isValidHash(authQuery: AuthentificationUserDomainQuery):
   Result<TelegramHashNotValidError | TelegramDateNotValidError |
   FieldErrors | ArrayFieldErrors, true> {
    const telegramAuthDTOValidator = new TelegramAuthDTOValidator();

    const validationResult = telegramAuthDTOValidator.validate(authQuery.telegramAuthDTO);

    if (validationResult.isFailure()) {
      return failure(validationResult.value);
    }
    const receivedHash = authQuery.telegramAuthDTO.hash;
    const secret = new Bun.CryptoHasher('sha256').update(authQuery.botToken).digest();
    const rawData = Object
      .entries(authQuery.telegramAuthDTO)
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
        { hash: authQuery.telegramAuthDTO.hash },
      ));
    }

    const nowTimeStamp = this.getNowDate().getTime();
    const hashLifeTimeAsMilliSeconds = nowTimeStamp - Number(authQuery.telegramAuthDTO.auth_date);
    const hashLifeTimeValid = (
      (TG_AUTH_HASH_LIFETIME_AS_SECONDS * 1000) - hashLifeTimeAsMilliSeconds
    );

    if (hashLifeTimeValid < 0) {
      return failure(dodUtility.getDomainErrorByType<TelegramDateNotValidError>(
        'TelegramAuthDateNotValidError',
        'Прошло больше {{authHashLifetimeAsSeconds}} секунд после получения кода авторизации в телеграм. Повторите процедуру авторизации еще раз.',
        { authHashLifetimeAsSeconds: TG_AUTH_HASH_LIFETIME_AS_SECONDS },
      ));
    }
    return success(true);
  }

  private generateJwtToken(authQuery: AuthentificationUserDomainQuery): JwtTokens {
    const tokenData: JWTPayload = {
      userId: this.attrs.userId,
      telegramId: this.attrs.telegramId,
      employeeId: this.attrs.employeeId,
    };
    const accessToken = jwt.sign({ ...tokenData, typeToken: 'access' }, authQuery.jwtTokenGeneratePrivateKey, { expiresIn: '1h', algorithm: 'RS512' });
    const refreshToken = jwt.sign({ ...tokenData, typeToken: 'refresh' }, authQuery.jwtTokenGeneratePrivateKey, { expiresIn: '7d', algorithm: 'RS512' });
    return { accessToken, refreshToken };
  }

  getNowDate(): Date {
    return new Date();
  }
}
