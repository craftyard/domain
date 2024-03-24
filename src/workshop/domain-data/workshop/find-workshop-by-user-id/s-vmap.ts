/* eslint-disable function-paren-newline */
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { RequestDodValidator } from 'rilata/src/app/service/types';
import { FindWorkshopByUserIdRequestDod, FindWorkshopByUserIdServiceParams } from './s-params';
import { userAttrsVMap } from '../../../../subject/domain-data/user/v-map';

const gettingUserVMap: ValidatorMap<FindWorkshopByUserIdRequestDod['attrs']> = {
  userId: userAttrsVMap.userId,
};

export const findWorkshopByUserIdValidator:
RequestDodValidator<FindWorkshopByUserIdServiceParams> = new DtoFieldValidator(
  'findWorkshopByUserId', true, { isArray: false }, 'dto', gettingUserVMap,
);
