import { UuidType } from 'rilata/src/common/types';

export type ModelCategory = 'Мебель' | 'Кухонная утварь' | 'Игрушки';

export type ModelAttrs = {
    workshopId: UuidType,
    userId: UuidType,
    name: string,
    category: ModelCategory,
}
