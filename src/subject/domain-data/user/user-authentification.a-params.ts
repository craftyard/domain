import { ActionParams, DomainResult } from "rilata2/src/domain/domain-object-data/aggregate-data-types";
import { TelegramId } from "../../../types";
import { UserId, UuidType } from "rilata2/src/common/types";
import { UserAttrs } from "./params";

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
  JWT_SECRET: string,
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