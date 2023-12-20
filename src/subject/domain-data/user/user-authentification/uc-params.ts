import { ErrorDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { InputOptions, QueryUseCaseParams } from 'rilata2/src/app/use-case/types';
import { JWTTokens } from 'rilata2/src/app/jwt/types';
import { AuthentificationUserActionParams, TelegramAuthDTO } from './a-params';
import { UserParams } from '../params';

export type UserAuthentificationActionDod = {
  actionName: 'userAuthentification',
  body: TelegramAuthDTO,
}

export type UserAuthentificationInputOptions = InputOptions<UserAuthentificationActionDod>

export type UserAuthentificationOut = JWTTokens;

type UserIsAlreadyAuthorizedLocale = {
  text: 'Вы уже авторизованы',
  hint: Record<string, never>,
}

export type UserIsAlreadyAuthorizedError = ErrorDod<UserIsAlreadyAuthorizedLocale, 'UserIsAlreadyAuthorized'>

export type UserAuthentificationErrors = UserIsAlreadyAuthorizedError | AuthentificationUserActionParams['errors'];

export type AuthenticationUserUCParams = QueryUseCaseParams<
  UserParams, UserAuthentificationInputOptions, UserAuthentificationOut, UserAuthentificationErrors
>
