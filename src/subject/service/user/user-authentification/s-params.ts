import { JWTTokens } from 'rilata/src/app/jwt/types';
import { ErrorDod, RequestDod } from 'rilata/src/domain/domain-data/domain-types';
import { QueryServiceParams } from 'rilata/src/app/service/types';
import { TelegramAuthDTO, UserAuthentificationRequestParams } from '../../../domain-data/user/user-authentification/a-params';
import { UserParams } from '../../../domain-data/user/params';

export type UserAuthenticationRequestDodAttrs = TelegramAuthDTO;

export type UserAuthentificationRequestDod = RequestDod<UserAuthenticationRequestDodAttrs, 'userAuthentification'>

export type UserAuthentificationOut = JWTTokens;

type ManyAccountNotSupportedLocale = {
  name: 'ManyAccountNotSupportedError',
  text: 'У вас с одним аккаунтом telegram имеется много аккаунтов, к сожалению сейчас это не поддерживается. Обратитесь в техподдержку, чтобы вам помогли решить эту проблему.',
  hint: { telegramId: number },
}

export type ManyAccountNotSupportedError = ErrorDod<'ManyAccountNotSupportedError', ManyAccountNotSupportedLocale>

type TelegramUserDoesNotExistLocale = {
  name: 'TelegramUserDoesNotExistError',
  text: 'У вас нет аккаунта.',
  hint: { telegramId: number },
}

export type TelegramUserDoesNotExistError = ErrorDod<
'TelegramUserDoesNotExistError', TelegramUserDoesNotExistLocale
>

export type UserAuthentificationErrors = ManyAccountNotSupportedError
  | TelegramUserDoesNotExistError
  | UserAuthentificationRequestParams['errors'];

export type UserAuthentificationServiceParams = QueryServiceParams<
  UserParams, UserAuthentificationRequestDod, UserAuthentificationOut, UserAuthentificationErrors
>
