import { ActionParams, DomainResult } from 'rilata/src/domain/domain-data/params-types';
import { ErrorDod, EventDod } from 'rilata/src/domain/domain-data/domain-types';
import { ModelAttrs, ModelCategory } from './params';
import { ModelAR } from '../domain-object/a-root';

export type AddModelDomainCommand = {
    name: string,
    category: ModelCategory,
    workshopId: string,
}

export type AddModelOut = ModelAR;

type UserMustBeModelerLocale = {
    text: 'Пользователь должен быть моделистом мастерской',
    hint:{ modeler: string }
}

export type UserMustBeModelerError = ErrorDod<UserMustBeModelerLocale, 'UserMustBeModeler'>

type ModelNameAlreadyHaveWorkshopLocale = {
    text: 'В одной мастерской не может быть одинаковых названий моделей',
    hint:{ model: string }
}

export type ModelNameAlreadyHaveWorkshopError = ErrorDod<ModelNameAlreadyHaveWorkshopLocale, 'ModelNameAlreadyHaveWorkshop'>

type AddedModelEventAttrs = ModelAttrs;

export type AddedModelEvent = EventDod<AddedModelEventAttrs, 'AddedModelEvent'>;

export type AddModelActionParams = ActionParams<
    AddModelDomainCommand,
    AddModelOut,
    never,
    AddedModelEvent[]
>

export type AddModelResult = DomainResult<AddModelActionParams>;
