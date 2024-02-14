/* eslint-disable function-paren-newline */
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { ActionDodValidator, GetActionDodBody } from 'rilata/src/app/service/types';
import { GetingWorkshopModelServiceParams } from './s-params';
import { modelAttrsVMap } from '../../v-map';

const gettingWorkshopModelVMap: ValidatorMap<
GetActionDodBody<GetingWorkshopModelServiceParams>
> = {
  modelId: modelAttrsVMap.modelId,
};

export const getingWorkshopModelValidator: ActionDodValidator<
GetingWorkshopModelServiceParams
> = new DtoFieldValidator(
  'getWorkshopModel', true, { isArray: false }, 'dto', gettingWorkshopModelVMap,
);
