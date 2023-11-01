/* eslint-disable function-paren-newline */
import { ValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { UuidField } from 'rilata2/src/domain/validator/field-validator/prepared-fields/string/uuid-field';
import { StringChoiceValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/string-choice.v-rule';
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';
import { roles } from './constans';
import {
  EmployeeAttrs,
} from './params';

export const employeeVMap: ValidatorMap<EmployeeAttrs> = {
  employeeId: new UuidField('employeeId'),
  roles: new LiteralFieldValidator(
    'roles', true, { isArray: true, minElementsCount: 1 }, 'string', [new StringChoiceValidationRule(roles)],
  ),
  workshopId: new UuidField('workshopId'),
};