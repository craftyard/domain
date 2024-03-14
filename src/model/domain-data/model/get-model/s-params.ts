import { QueryServiceParams } from 'rilata/src/app/service/types';
import { UuidType } from 'rilata/src/common/types';
import { ErrorDod } from 'rilata/src/domain/domain-data/domain-types';
import { ModelParams, ModelAttrs } from '../../params';

export type GetWorkshopModelRequestDod = {
  meta: {
    name: 'getWorkshopModel',
    requestId: UuidType,
    domainType: 'request',
  }
 attrs:{
  workshopId: UuidType,
  modelId: UuidType,
 },
}

export type getWorkshopModelOut = ModelAttrs;

type ModelIsNotExistBody = {
  text: 'Модель под идентификатором {{modelId}} не существует',
  hint: {
    modelId: UuidType
  },
  name: 'ModelIsNotExistError',
}

export type ModelIsNotExistError = ErrorDod<'ModelIsNotExistError', ModelIsNotExistBody>;

type WorkshopIsNotExistBody = {
  text: 'Мастерская под идентификатором {{workshopId}} не существует',
  hint: {
    workshopId: UuidType,
  },
  name: 'WorkshopIsNotExistError',
}

export type WorkshopIsNotExistError = ErrorDod<'WorkshopIsNotExistError', WorkshopIsNotExistBody>;

export type GettingWorkshopModelServiceParams = QueryServiceParams<
  ModelParams,
  GetWorkshopModelRequestDod,
  getWorkshopModelOut,
  ModelIsNotExistError | WorkshopIsNotExistError
>
