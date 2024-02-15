/* eslint-disable function-paren-newline */
import { ActionDodValidator } from 'rilata/src/app/service/types';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { GetingCurrentUserServiceParams } from './s-params';

export const getCurrentUserValidator:
ActionDodValidator<GetingCurrentUserServiceParams> = new DtoFieldValidator(
  'getCurrentUser', true, { isArray: false }, 'dto', {},
);
