/* eslint-disable function-paren-newline */
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { ActionDodValidator, GetActionDodBody } from 'rilata/src/app/service/types';
import { workshopAttrsVMap } from '../../../../workshop/domain-data/workshop/v-map';
import { GetingWorkshopModelsServiceParams } from './s-params';

const getingWorkshopModelsVMap: ValidatorMap<
GetActionDodBody<GetingWorkshopModelsServiceParams>
> = {
  workshopId: workshopAttrsVMap.workshopId,
};

export const getingWorkshopModelsValidator: ActionDodValidator<
GetingWorkshopModelsServiceParams
> = new DtoFieldValidator(
  'getWorkshopModels', true, { isArray: false }, 'dto', getingWorkshopModelsVMap,
);
