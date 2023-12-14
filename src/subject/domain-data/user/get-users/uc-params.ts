import { Caller } from 'rilata2/src/app/caller';
import { QueryUseCaseParams } from 'rilata2/src/app/use-case/types';
import { UseCaseBaseErrors } from 'rilata2/src/app/use-case/error-types';
import { UserId } from 'rilata2/src/common/types';
import { UserAttrs } from '../params';

export type GetingUsersQuery = {
  queryName: 'getUsers',
  userIds: UserId[],
}

export type GetingUsersOut = UserAttrs[];

export type GetingUsersInputOptions = {
  command: GetingUsersQuery,
  caller: Caller,
}

export type GetingUsersUcParams = QueryUseCaseParams<
  GetingUsersQuery, GetingUsersOut, UseCaseBaseErrors
>
