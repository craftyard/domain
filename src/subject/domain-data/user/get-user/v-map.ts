/* eslint-disable function-paren-newline */
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { RequestDodValidator } from 'rilata/src/app/service/types';
import { GetUserRequestDod, GetingUserServiceParams } from './s-params';
import { userAttrsVMap } from '../v-map';

const getingUserVMap: ValidatorMap<GetUserRequestDod['attrs']> = {
  userId: userAttrsVMap.userId,
};

// eslint-disable-next-line max-len
export const getUserValidator: RequestDodValidator<GetingUserServiceParams
> = new DtoFieldValidator('getUser', true, { isArray: false }, 'dto', getingUserVMap);
