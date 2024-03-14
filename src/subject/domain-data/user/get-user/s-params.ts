import { QueryServiceParams } from 'rilata/src/app/service/types';
import { UserId, UuidType } from 'rilata/src/common/types';
import { ErrorDod } from 'rilata/src/domain/domain-data/domain-types';
import { UserAttrs, UserParams } from '../params';

export type GetUserRequestDod = {
  meta: {
    name: 'getUser',
    requestId: UuidType,
    domainType: 'request',
  }
  attrs: {
    userId: UserId
  },
}

export type GetingUserOut = UserAttrs;

type UserDoesNotExistBody = {
    text: 'Такого пользователя не существует',
    hint: {
      userId: UserId
    },
    name: 'UserDoesNotExistError',
}

export type UserDoesNotExistError = ErrorDod<'UserDoesNotExistError', UserDoesNotExistBody>

export type GetingUserServiceParams = QueryServiceParams<
  UserParams, GetUserRequestDod, GetingUserOut, UserDoesNotExistError
>
