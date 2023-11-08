import { Caller } from 'rilata2/src/app/caller';
import { ErrorDod, UseCaseQueryDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { QueryUseCaseParams } from 'rilata2/src/app/use-case/types';
import { JwtToken, TelegramAuthDTO } from '../../domain-data/user/user-authentification.a-params';

export type AuthentificationUserUCQuery = UseCaseQueryDod<TelegramAuthDTO, 'AuthentificationUserQuery'>

export type AuthentificationUserInputOptions = {
  query: AuthentificationUserUCQuery,
  caller: Caller;
}

export type AuthentificationUserSuccessOut = JwtToken;

export type AuthentificationUserErrors = ErrorDod<
  {
  text: 'Пользователь по такому TelegramID не зарегистрирован в приложений',
  hint: Record<never, unknown>},
  'AuthentificationUserErrors'
>;

export type AuthentificationUserUCParams = QueryUseCaseParams<
  AuthentificationUserInputOptions, AuthentificationUserSuccessOut, AuthentificationUserErrors
>
