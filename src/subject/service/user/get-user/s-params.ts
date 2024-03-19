import { UuidType } from 'rilata/src/common/types';
import { RequestDod } from 'rilata/src/domain/domain-data/domain-types';
import { QueryServiceParams } from 'rilata/src/app/service/types';
import { UserAttrs, UserParams } from '../../../domain-data/user/params';

export type GetUserRequestDodAttrs = {
  userId: UuidType,
}

export type GetUserRequestDod = RequestDod<GetUserRequestDodAttrs, 'getUser'>

export type GetUserOut = UserAttrs

export type GetUserServiceParams = QueryServiceParams<
  UserParams,
  GetUserRequestDod,
  GetUserOut,
  never
>
