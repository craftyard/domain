import { QueryServiceParams } from 'rilata/src/app/service/types';
import { UuidType } from 'rilata/src/common/types';
import { ErrorDod } from 'rilata/src/domain/domain-data/domain-types';
import { ModelParams, ModelAttrs } from '../../params';

export type GetWorkshopModelActionDod = {
  meta: {
    name: 'getWorkshopModel',
    actionId: UuidType,
    domainType: 'action',
  }
 attrs:{
  modelId: UuidType
 },
}

export type getWorkshopModelpOut = ModelAttrs;

type ModelIsntExistLocale = {
  text: 'Модель под идентификатором {{modelId}} не существует',
  hint: { modelId: UuidType }
}

export type ModelIsntExistError = ErrorDod<ModelIsntExistLocale, 'ModelIsntExistError'>;

export type GetingWorkshopModelServiceParams = QueryServiceParams<
  ModelParams, GetWorkshopModelActionDod, getWorkshopModelpOut, ModelIsntExistError
>
