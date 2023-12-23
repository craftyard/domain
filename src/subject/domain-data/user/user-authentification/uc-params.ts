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

type ManyEmployeeAccountNotSupportedLocale = {
  text: 'У вас с одним аккаунтом telegram имеется два пользовательских аккаунта сотрудников. К сожалению сейчас это не поддерживается. Обратитесь в техподдержку, чтобы вам помогли решить эту проблему.',
  hint: { telegramId: number },
}

export type ManyEmployeeAccountNotSupportedError = ErrorDod<ManyEmployeeAccountNotSupportedLocale, 'TwoEmployeeAccountNotSupportedError'>

type EmployeeUserDoesNotExistLocale = {
  text: 'У вас нет аккаунта сотрудника.',
  hint: { telegramId: number },
}

export type EmployeeUserDoesNotExistError = ErrorDod<EmployeeUserDoesNotExistLocale, 'EmployeeUserDoesNotExistError'>

export type UserAuthentificationErrors = ManyEmployeeAccountNotSupportedError
  | EmployeeUserDoesNotExistError
  | UserAuthentificationActionParams['errors'];

export type UserAuthentificationUCParams = QueryUseCaseParams<
  UserParams, UserAuthentificationInputOptions, UserAuthentificationOut, UserAuthentificationErrors
>
