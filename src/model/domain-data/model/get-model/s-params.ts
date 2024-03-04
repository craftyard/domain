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
  workshopId: UuidType,
  modelId: UuidType,
 },
}

export type getWorkshopModelOut = ModelAttrs;

type ModelIsNotExistLocale = {
  text: 'Модель под идентификатором {{modelId}} не существует',
  hint: { modelId: UuidType }
}

type WorkshopIsNotExistLocale = {
  text: 'Мастерская под идентификатором {{workshopId}} не существует',
  hint: { workshopId: UuidType }
}

export type ModelIsNotExistError = ErrorDod<ModelIsNotExistLocale, 'ModelIsntExistError'>;

export type WorkshopIsNotExistError = ErrorDod<WorkshopIsNotExistLocale, 'WorkshopIsntExistError'>;

export type GettingWorkshopModelServiceParams = QueryServiceParams<
  ModelParams, GetWorkshopModelActionDod, getWorkshopModelOut,
  ModelIsNotExistError | WorkshopIsNotExistError
>
