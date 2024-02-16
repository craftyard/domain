/* eslint-disable function-paren-newline */
import { ActionDodValidator } from 'rilata/src/app/service/types';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { GetAllWorkshopServiceParams } from './s-params';

export const getAllWorkshopValidator:
ActionDodValidator<GetAllWorkshopServiceParams> = new DtoFieldValidator(
  'getAllWorkshop', true, { isArray: false }, 'dto', {},
);
