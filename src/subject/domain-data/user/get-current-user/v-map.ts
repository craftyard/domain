/* eslint-disable function-paren-newline */
import { ActionDodValidator } from 'rilata/src/app/service/types';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { GetingCurrentUserServiceParams } from './s-params';

export const getUserServiceValidator:
ActionDodValidator<GetingCurrentUserServiceParams> = new DtoFieldValidator(
  'GetCurrentUser', true, { isArray: false }, 'dto', {},
);
