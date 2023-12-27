/* eslint-disable function-paren-newline */
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';

export const getMyWorkshopValidator = new DtoFieldValidator(
  'getMyWorkshop', true, { isArray: false }, 'dto', {},
);
