import { UuidType } from 'rilata/src/common/types';

export type ModelCategory = 'Мебель' | 'Кухонная утварь' | 'Игрушки';

export type ModelAttrs = {
    modelId: UuidType,
    workshopId: UuidType,
    name: string,
    category: ModelCategory,
}

