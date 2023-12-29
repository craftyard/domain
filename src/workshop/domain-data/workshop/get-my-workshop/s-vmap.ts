/* eslint-disable function-paren-newline */
import { ActionDodValidator } from 'rilata/src/app/service/types';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { GetMyWorkshopServiceParams } from './s-params';

export const getMyWorkshopValidator:
ActionDodValidator<GetMyWorkshopServiceParams> = new DtoFieldValidator(
  'getMyWorkshop', true, { isArray: false }, 'dto', {},
);
