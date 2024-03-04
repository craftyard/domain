import { QueryServiceParams } from 'rilata/src/app/service/types';
import { UuidType } from 'rilata/src/common/types';
import { ModelParams, ModelAttrs } from '../../params';

export type GetWorkshopModelsActionDod = {
  meta: {
    name: 'getWorkshopModels',
    actionId: UuidType,
    domainType: 'action',
  }
 attrs:{
  workshopId: UuidType
 },
}
export type getWorkshopModelsOut = ModelAttrs[];

export type GetingWorkshopModelsServiceParams = QueryServiceParams<
  ModelParams, GetWorkshopModelsActionDod, getWorkshopModelsOut, never
>
