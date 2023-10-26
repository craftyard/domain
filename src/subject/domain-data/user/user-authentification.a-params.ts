import { ActionParams, DomainResult } from "rilata2/src/domain/domain-object-data/aggregate-data-types";
import { TelegramId } from "../../../types";
import { UserId, UuidType } from "rilata2/src/common/types";

export type TelegramAuthDTO = {
  id: TelegramId,
  first_name: string,
  Last_name: string,
  username: string,
  photo_url: string,
  auth_date: string,
  hash: string,
}

export type AuthentificationUserDomainQuery = {
  telegramAuthDto: TelegramAuthDTO,
  botToken: string,
}

export type JwtToken = {
  header: {
    typ: 'jwt',
    alg: 'HS256',
  },
  payload: {
    userId: UserId,
    telegramId: TelegramId,
    employeeId: UuidType,
    signature: string,
  }
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
