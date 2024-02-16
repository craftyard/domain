import { UuidType } from 'rilata/src/common/types';
import { QueryServiceParams } from 'rilata/src/app/service/types';
import { WorkshopAttrs, WorkshopParams } from '../params';

export type GetAllWorkshopActionDod = {
  meta: {
    name: 'getAllWorkshop',
    actionId: UuidType,
    domainType: 'action',
  },
  attrs: Record<string, never>,
};

export type GetAllWorkshopOut = WorkshopAttrs;

export type GetAllWorkshopServiceParams = QueryServiceParams<
  WorkshopParams, GetAllWorkshopActionDod, GetAllWorkshopOut, never
>
