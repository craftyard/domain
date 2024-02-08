/* eslint-disable function-paren-newline */
import { ActionDodValidator, GetActionDodBody } from 'rilata/src/app/service/types';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { FindWorkshopByUserIdServiceParams } from './s-params';
import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { userAttrsVMap } from '../../../../subject/domain-data/user/v-map';

const gettingUserVMap: ValidatorMap<GetActionDodBody<FindWorkshopByUserIdServiceParams>> = {
  userId: userAttrsVMap.userId,
}

export const findWorkshopByUserIdValidator:
ActionDodValidator<FindWorkshopByUserIdServiceParams> = new DtoFieldValidator(
  'findWorkshopByUserId', true, { isArray: false }, 'dto', gettingUserVMap,
);
