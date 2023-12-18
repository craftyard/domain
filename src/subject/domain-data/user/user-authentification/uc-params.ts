import { Caller } from 'rilata2/src/app/caller';
import { UseCaseQueryDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { QueryUseCaseParams } from 'rilata2/src/app/use-case/types';
import { JWTTokens } from 'rilata2/src/app/jwt/types';
import { TelegramAuthDTO } from './a-params';

export type AuthenticationUserUCQuery = UseCaseQueryDod<TelegramAuthDTO, 'AuthenticationUserUCQuery'>

export type AuthenticationUserInputOptions = {
  query: AuthenticationUserUCQuery,
  caller: Caller;
}

export type AuthenticationUserSuccessOut = JWTTokens;

export type AuthenticationUserErrors = never;

export type AuthenticationUserUCParams = QueryUseCaseParams<
  AuthenticationUserInputOptions, AuthenticationUserSuccessOut, AuthenticationUserErrors
>
