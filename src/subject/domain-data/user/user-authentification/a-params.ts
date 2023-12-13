import { ActionParams, DomainResult } from 'rilata2/src/domain/domain-object-data/aggregate-data-types';
import { UserId, UuidType } from 'rilata2/src/common/types';
import { ErrorDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { JWTTokens } from 'rilata2/src/app/jwt/types';
import { TelegramId } from '../../../../types';

export type TelegramAuthDTO = {
  id?: TelegramId,
  first_name?: string,
  last_name?: string,
  username?: string,
  photo_url?: string,
  auth_date: string,
  hash: string,
}

export type AuthentificationUserDomainQuery = {
  telegramAuthDTO: TelegramAuthDTO,
  botToken: string,
}

export type JWTPayload = {
    userId: UserId,
    employeeId?: UuidType,
}

type TelegramHashNotValidLocale = {
    text: 'Хэш телеграмма некорректный',
    hint:{
        hash: string,
    }
}

export type TelegramHashNotValidError = ErrorDod<TelegramHashNotValidLocale, 'TelegramHashNotValidError'>

type TelegramAuthDateNotValidLocale = {
    text: 'Прошло больше {{authHashLifetimeAsSeconds}} секунд после получения кода авторизации в телеграм. Повторите процедуру авторизации еще раз.',
    hint:{
        authHashLifetimeAsSeconds: number,
    }
}

export type TelegramDateNotValidError = ErrorDod<TelegramAuthDateNotValidLocale, 'TelegramAuthDateNotValidError'>

export type AuthentificationUserActionParams = ActionParams<
  'userAuthentification',
  'instance',
  AuthentificationUserDomainQuery,
  JWTTokens,
  TelegramDateNotValidError | TelegramHashNotValidError,
  never
>

export type AuthentificationUserResult = DomainResult<AuthentificationUserActionParams>;
