import { ActionParams, DomainResult } from 'rilata/src/domain/domain-data/params-types';
import { ErrorDod } from 'rilata/src/domain/domain-data/domain-types';
import { ModelCategory } from './params';
import { ModelAR } from '../domain-object/a-root';

export type AddModelDomainQuery = {
    name: string,
    category: ModelCategory,
}

export type AddModelOut = ModelAR;

type ModelerMustBeWorkshopLocale = {
    text: 'Пользователь должен быть моделистом мастерской',
    hint:{ modeler: string }
}

export type ModelerMustBeWorkshopError = ErrorDod<ModelerMustBeWorkshopLocale, 'ModelerMustBeWorkshop'>

type ModelNameSameCannotOneWorkshopLocale = {
    text: 'В одной мастерской не может быть одинаковых названий моделей',
    hint:{ model: string }
}

export type ModelNameSameCannotOneWorkshopError = ErrorDod<ModelNameSameCannotOneWorkshopLocale, 'ModelNameSameCannotOneWorkshop'>

export type AddModelActionParams = ActionParams<
    AddModelDomainQuery,
    AddModelOut,
    ModelerMustBeWorkshopError | ModelNameSameCannotOneWorkshopError,
    never
>

export type AddModelResult = DomainResult<AddModelActionParams>;
