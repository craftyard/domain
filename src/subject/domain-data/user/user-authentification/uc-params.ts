import { ErrorDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { InputOptions, QueryUseCaseParams } from 'rilata2/src/app/use-case/types';
import { JWTTokens } from 'rilata2/src/app/jwt/types';
import { UserAuthentificationActionParams, TelegramAuthDTO } from './a-params';
import { UserParams } from '../params';

export type UserAuthentificationActionDod = {
  actionName: 'userAuthentification',
  body: TelegramAuthDTO,
}

export type UserAuthentificationInputOptions = InputOptions<UserAuthentificationActionDod>

export type UserAuthentificationOut = JWTTokens;

type ManyAccountNotSupportedLocale = {
  text: 'У вас с одним аккаунтом telegram имеется много аккаунтов, к сожалению сейчас это не поддерживается. Обратитесь в техподдержку, чтобы вам помогли решить эту проблему.',
  hint: { telegramId: number },
}

export type ManyAccountNotSupportedError = ErrorDod<ManyAccountNotSupportedLocale, 'ManyAccountNotSupportedError'>

type TelegramUserDoesNotExistLocale = {
  text: 'У вас нет аккаунта.',
  hint: { telegramId: number },
}

export type TelegramUserDoesNotExistError = ErrorDod<
  TelegramUserDoesNotExistLocale, 'TelegramUserDoesNotExistError'
>

export type UserAuthentificationErrors = ManyAccountNotSupportedError
  | TelegramUserDoesNotExistError
  | UserAuthentificationActionParams['errors'];

export type UserAuthentificationUCParams = QueryUseCaseParams<
  UserParams, UserAuthentificationInputOptions, UserAuthentificationOut, UserAuthentificationErrors
>
