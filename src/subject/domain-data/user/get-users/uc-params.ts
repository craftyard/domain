import { InputOptions, QueryUseCaseParams } from 'rilata2/src/app/use-case/types';
import { UseCaseBaseErrors } from 'rilata2/src/app/use-case/error-types';
import { UserId } from 'rilata2/src/common/types';
import { UserAttrs, UserParams } from '../params';

export type GetUsersActionDod = {
  actionName: 'getUsers',
  body: {
    userIds: UserId[]
  },
}

export type GetUsersInputOptions = InputOptions<GetUsersActionDod>

export type GetingUsersOut = UserAttrs[];

export type GetingUsersUcParams = QueryUseCaseParams<
  UserParams, GetUsersInputOptions, GetingUsersOut, UseCaseBaseErrors
>
