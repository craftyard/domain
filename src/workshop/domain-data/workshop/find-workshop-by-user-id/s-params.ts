import { UserId, UuidType } from 'rilata/src/common/types';
import { QueryServiceParams } from 'rilata/src/app/service/types';
import { WorkshopOutAttrs, WorkshopParams } from '../params';

export type FindWorkshopByUserIdActionDod = {
  attrs: {userId: UserId},
  meta: {
    name: 'findWorkshopByUserId',
    actionId: UuidType,
    domainType: 'action',
  }
};

export type FindWorkshopByUserIdOut = WorkshopOutAttrs | undefined;

export type FindWorkshopByUserIdServiceParams = QueryServiceParams<
  WorkshopParams, FindWorkshopByUserIdActionDod, FindWorkshopByUserIdOut, never
>
