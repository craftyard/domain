/* eslint-disable function-paren-newline */
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { ActionDodValidator, GetActionDodBody } from 'rilata/src/app/service/types';
import { GettingWorkshopModelServiceParams } from './s-params';
import { modelAttrsVMap } from '../../v-map';
import { workshopAttrsVMap } from '../../../../workshop/domain-data/workshop/v-map';

const gettingWorkshopModelVMap: ValidatorMap<
GetActionDodBody<GettingWorkshopModelServiceParams>
> = {
  workshopId: workshopAttrsVMap.workshopId,
  modelId: modelAttrsVMap.modelId,
};

export const gettingWorkshopModelValidator: ActionDodValidator<
GettingWorkshopModelServiceParams
> = new DtoFieldValidator(
  'getWorkshopModel', true, { isArray: false }, 'dto', gettingWorkshopModelVMap,
);
