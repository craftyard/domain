import { UuidType } from 'rilata/src/common/types';
import { DomainMeta } from 'rilata/src/domain/domain-data/domain-types';
import { AggregateRootDataParams } from 'rilata/src/domain/domain-data/params-types';
import { AddModelActionParams } from './a-params';

export type ModelCategory = 'Мебель' | 'Кухонная утварь' | 'Игрушки';

export type ModelAttrs = {
    modelId: UuidType,
    workshopId: UuidType,
    name: string,
    category: ModelCategory,
}

export type ModelMeta = DomainMeta<'ModelAR'>;

export type AddModelParams = AggregateRootDataParams<
  ModelAttrs, ModelMeta, AddModelActionParams, []
>;
