import { UserId, UuidType } from 'rilata/src/common/types';
import { QueryServiceParams } from 'rilata/src/app/service/types';
import { WorkshopOutAttrs, WorkshopParams } from '../params';

export type FindWorkshopByUserIdRequestDod = {
  attrs: {
    userId: UserId
  },
  meta: {
    name: 'findWorkshopByUserId',
    requestId: UuidType,
    domainType: 'request',
  }
};

export type FindWorkshopByUserIdOut = WorkshopOutAttrs | undefined;

export type FindWorkshopByUserIdServiceParams = QueryServiceParams<
  WorkshopParams, FindWorkshopByUserIdRequestDod, FindWorkshopByUserIdOut, never
>
