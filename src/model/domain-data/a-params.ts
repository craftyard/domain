import { ActionParams, DomainResult } from 'rilata/src/domain/domain-data/params-types';
import { ErrorDod, EventDod } from 'rilata/src/domain/domain-data/domain-types';
import { UuidType } from 'rilata/src/common/types';
import { ModelAttrs, ModelCategory } from './params';
import { ModelAR } from '../domain-object/a-root';

export type AddModelDomainCommand = {
    name: string,
    category: ModelCategory,
    workshopId: UuidType,
}

export type AddModelOut = ModelAR;

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

type AddedModelEventAttrs = ModelAttrs;

export type AddedModelEvent = EventDod<AddedModelEventAttrs, 'AddedModelEvent'>;

export type AddModelActionParams = ActionParams<
    AddModelDomainCommand,
    AddModelOut,
    never,
    AddedModelEvent[]
>

export type AddModelResult = DomainResult<AddModelActionParams>;
