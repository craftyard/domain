import { UserId } from 'rilata/src/common/types';
import { JWTTokens } from 'rilata/src/app/jwt/types';
import { ErrorDod } from 'rilata/src/domain/domain-data/domain-types';
import { ActionParams, DomainResult } from 'rilata/src/domain/domain-data/params-types';
import { TelegramId } from '../../../../types';

export type TelegramAuthDTO = {
  id: TelegramId,
  first_name?: string,
  last_name?: string,
  username?: string,
  photo_url?: string,
  auth_date: number,
  hash: string,
}

export type UserAuthentificationDomainQuery = {
  telegramAuthDTO: TelegramAuthDTO,
  botToken: string,
}

export type JWTPayload = {
    userId: UserId,
}

type TelegramHashNotValidBody = {
    text: 'Хэш телеграмма некорректный',
    hint: {
      hash: string
    },
    name: 'TelegramHashNotValidError',
}

export type TelegramHashNotValidError = ErrorDod<'TelegramHashNotValidError', TelegramHashNotValidBody>

type TelegramAuthDateNotValidBody = {
    text: 'Прошло больше {{authHashLifetimeAsSeconds}} секунд после получения кода авторизации в телеграм. Повторите процедуру авторизации еще раз.',
    hint:{
      authHashLifetimeAsSeconds: number
    },
    name: 'TelegramAuthDateNotValidError',
}

export type TelegramAuthDateNotValidError = ErrorDod<'TelegramAuthDateNotValidError', TelegramAuthDateNotValidBody>

export type UserAuthentificationActionParams = ActionParams<
  UserAuthentificationDomainQuery,
  JWTTokens,
  TelegramAuthDateNotValidError | TelegramHashNotValidError,
  never
>

export type UserAuthentificationResult = DomainResult<UserAuthentificationActionParams>;
