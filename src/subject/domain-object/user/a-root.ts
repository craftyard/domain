import { AggregateRoot } from 'rilata2/src/domain/domain-object/aggregate-root';
import crypto from 'crypto';
import { failure } from 'rilata2/src/common/result/failure';
import { dodUtility } from 'rilata2/src/common/utils/domain-object/dod-utility';
import { Result } from 'rilata2/src/common/result/types';
import { success } from 'rilata2/src/common/result/success';
import { DomainResult } from 'rilata2/src/domain/domain-object-data/aggregate-data-types';
import { Logger } from 'rilata2/src/common/logger/logger';
import { TokenCreator } from 'rilata2/src/app/jwt/token-creator.interface';
import { AggregateRootHelper } from 'rilata2/src/domain/domain-object/aggregate-helper';
import {
  UserAuthentificationActionParams,
  UserAuthentificationDomainQuery,
  JWTPayload,
  TelegramDateNotValidError,
  TelegramHashNotValidError,
} from '../../domain-data/user/user-authentification/a-params';
import { UserAttrs, UserMeta, UserParams } from '../../domain-data/user/params';
import { TG_AUTH_HASH_LIFETIME_AS_SECONDS } from '../../subject-config';
import { userARValidator } from '../../domain-data/user/v-map';

export class UserAR extends AggregateRoot<UserParams> {
  protected helper: AggregateRootHelper<UserParams>;

  constructor(
    protected attrs: UserAttrs,
    protected version: number,
    protected logger: Logger,
  ) {
    super();
    const result = userARValidator.validate(attrs);
    if (result.isFailure()) this.logger.error('Не соблюдены инварианты UserAR', { attrs, result });
    this.helper = new AggregateRootHelper(attrs, 'UserAR', version, [], logger);
  }

  override getId(): string {
    return this.attrs.userId;
  }

  protected getMeta(): UserMeta {
    return {
      name: 'UserAR',
      domainType: 'domain-object',
      objectType: 'aggregate',
    };
  }

  getShortName(): string {
    return `${this.attrs.userProfile.lastName} ${this.attrs.userProfile.firstName}`;
  }

  userAuthentification(
    authQuery: UserAuthentificationDomainQuery,
    tokenCreator: TokenCreator<JWTPayload>,
  ):DomainResult<UserAuthentificationActionParams> {
    const result = this.isValidHash(authQuery);

    if (result.isFailure()) {
      return failure(result.value);
    }

    const tokenData: JWTPayload = {
      userId: this.attrs.userId,
    };

    const jwtTokens = tokenCreator.createToken(tokenData);
    return success(jwtTokens);
  }

  private isValidHash(authQuery: UserAuthentificationDomainQuery):
   Result<TelegramHashNotValidError | TelegramDateNotValidError, true> {
    const secret = new Bun.CryptoHasher('sha256').update(authQuery.botToken).digest();
    const { hash, ...telegramAuthDTOWithoutHash } = authQuery.telegramAuthDTO;
    const rawData = Object
      .entries(telegramAuthDTOWithoutHash)
      .map(([key, value]) => `${key}=${value}`)
      .sort()
      .join('\n');
    const calcHash = crypto.createHmac('sha256', secret).update(rawData).digest('hex');
    if (hash !== calcHash) {
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

  getNowDate(): Date {
    return new Date();
  }
}
