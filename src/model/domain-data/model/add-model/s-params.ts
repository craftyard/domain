import { UuidType } from 'rilata/src/common/types';
import { ErrorDod } from 'rilata/src/domain/domain-data/domain-types';
import { CommandServiceParams } from 'rilata/src/app/service/types';
import { ModelParams } from '../../params';
import { AddModelOut, AddedModelEvent } from './a-params';

export type ModelRequestDOD = {
    meta: {
        name: 'addModel',
        requestId: UuidType,
        domainType: 'request',
      }
    attrs: {
        name: string,
        category: string,
        workshopId: UuidType,
    },
}

type UserMustBeModelerBody = {
    text: 'Пользователь должен быть моделистом мастерской',
    hint: Record<string, never>,
    name: 'UserMustBeModelerError',
}

export type UserMustBeModelerError = ErrorDod<'UserMustBeModelerError', UserMustBeModelerBody>;

type ModelNameAlreadyExistBody = {
    text: 'Имя модели {{modelName}} уже существует в вашей мастерской',
    hint: {
        modelName: string
    },
    name: 'ModelNameAlreadyExistsError',
}

export type ModelNameAlreadyExistsError = ErrorDod<'ModelNameAlreadyExistsError', ModelNameAlreadyExistBody>

export type AddModelErrors = ModelNameAlreadyExistsError | UserMustBeModelerError;

export type AddModelServiceParams = CommandServiceParams<
    ModelParams,
    ModelRequestDOD,
    AddModelOut,
    AddModelErrors,
    AddedModelEvent[]
>;
