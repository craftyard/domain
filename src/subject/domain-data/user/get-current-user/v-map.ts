/* eslint-disable function-paren-newline */
import { ActionDodValidator } from 'rilata/src/app/service/types';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { GetingUserServiceParams } from './s-params';

export const getUserServiceValidator:
ActionDodValidator<GetingUserServiceParams> = new DtoFieldValidator(
  'GetCurrentUser', true, { isArray: false }, 'dto', {},
);
