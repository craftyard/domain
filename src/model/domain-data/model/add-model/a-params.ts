import { ActionParams, DomainResult } from 'rilata/src/domain/domain-data/params-types';
import { EventDod } from 'rilata/src/domain/domain-data/domain-types';
import { UuidType } from 'rilata/src/common/types';
import { ModelAttrs, ModelCategory } from '../../params';
import { ModelAR } from '../../../domain-object/model/a-root';

export type AddModelDomainCommand = {
    name: string,
    category: ModelCategory,
    workshopId: UuidType,
    images: string[],
}

export type AddModelOut = ModelAR;

type AddedModelEventAttrs = ModelAttrs;

export type AddedModelEvent = EventDod<AddedModelEventAttrs, 'AddedModelEvent'>;

export type AddModelActionParams = ActionParams<
    AddModelDomainCommand,
    AddModelOut,
    never,
    AddedModelEvent[]
>

export type AddModelResult = DomainResult<AddModelActionParams>;
