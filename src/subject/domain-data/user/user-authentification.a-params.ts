import { ActionParams, DomainResult } from 'rilata2/src/domain/domain-object-data/aggregate-data-types';
import { UserId, UuidType } from 'rilata2/src/common/types';
import { ErrorDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { TelegramId } from '../../../types';
import { UserAttrs } from './params';

export type TelegramAuthDTO = {
  id: TelegramId,
  first_name: string,
  Last_name?: string,
  username: string,
  photo_url: string,
  auth_date: string,
  hash: string,
}

export type AuthentificationUserDomainQuery = {
  telegramAuthDto: TelegramAuthDTO,
  botToken: string,
  privateKey: string,
  userAttrs:UserAttrs,
}

export type JwtToken ={
  jwtToken: string;
}

export type JwtTokens ={
  accessToken: string;
  refreshToken:string
}

export type JwtAccessData = {
    userId: UserId,
    telegramId: TelegramId,
    employeeId?: UuidType,
}
export type JwtRefreshData = {
  jwtAccessData:JwtAccessData,
  salt:string,
}

export type AuthentificationUserActionParams = ActionParams<
  'userAuthentification',
  'instance',
  AuthentificationUserDomainQuery,
  JwtToken,
  never,
  never
>

export type AuthentificationUserResult = DomainResult<AuthentificationUserActionParams>;

export type TelegramHashNotValidBody = {
    text: 'Хэш телеграмма некорректный',
    hint:{
        hash: string,
    }
}

export type TelegramHashNotValidError = ErrorDod<TelegramHashNotValidBody, 'TelegramHashNotValidError'>

export type TelegramAuthDateNotValidError = {
    text: 'Прошло больше {{authHashLifetimeAsSeconds}} секунд после получения кода авторизации в телеграм. Повторите процедуру авторизации еще раз.',
    hint:{
        authHashLifetimeAsSeconds: number,
    }
}

export type TelegramDateNotValidError = ErrorDod<TelegramAuthDateNotValidError, 'TelegramAuthDateNotValidError'>
