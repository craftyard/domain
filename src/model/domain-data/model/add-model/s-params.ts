import { UuidType } from 'rilata/src/common/types';
import { ErrorDod } from 'rilata/src/domain/domain-data/domain-types';
import { CommandServiceParams } from 'rilata/src/app/service/types';
import { ModelParams } from '../../params';
import { AddModelOut, AddedModelEvent } from './a-params';

export type ModelActionDOD = {
    meta: {
        name: 'addModel',
        actionId: UuidType,
        domainType: 'action',
      }
    attrs: {
        name: string,
        category: string,
        workshopId: UuidType,
    },
}

type UserMustBeModelerLocale = {
    text: 'Пользователь должен быть моделистом мастерской',
    hint: Record<string, never>,
}

export type UserMustBeModelerError = ErrorDod<UserMustBeModelerLocale, 'UserMustBeModelerError'>

type ModelNameAlreadyExistsLocale = {
    text: 'Имя модели {{modelName}} уже существует в вашей мастерской',
    hint: { modelName: string }
}

export type ModelNameAlreadyExistsError = ErrorDod<ModelNameAlreadyExistsLocale, 'ModelNameAlreadyExistsError'>

export type AddModelErrors = ModelNameAlreadyExistsError | UserMustBeModelerError;

export type AddModelServiceParams = CommandServiceParams<
    ModelParams,
    ModelActionDOD,
    AddModelOut,
    AddModelErrors,
    AddedModelEvent[]
>;
