import { UuidField } from 'rilata2/src/domain/validator/field-validator/prepared-fields/string/uuid-field';
import { ValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { MaxCharsCountValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/max-chars-count.v-rule';
import { PositiveNumberValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/number/positive-number.v-rule';
import { NoRequiredUuidField } from 'rilata2/src/domain/validator/field-validator/prepared-fields/string/no-required-uuid-field';
import { OnlyDashAndLitinicOrCyrillicCharsValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/only-dash-and-latinic-or-cyrillic-chars.v-rule';
import { UserProfile, UserAttrs } from './params';

export const userProfileVMap: ValidatorMap<UserProfile> = {
  name: new LiteralFieldValidator('name', true, { isArray: false }, 'string', [
    new MaxCharsCountValidationRule(50),
    new OnlyDashAndLitinicOrCyrillicCharsValidationRule(),
  ]),
};

export const userAttrsVMap: ValidatorMap<UserAttrs> = {
  userId: new UuidField('userId'),
  telegramId: new LiteralFieldValidator('telegramId', true, { isArray: false }, 'number', [new PositiveNumberValidationRule()]),
  employeeId: new NoRequiredUuidField('employeeId'),
  userProfile: new DtoFieldValidator('userProfile', true, { isArray: false }, 'dto', userProfileVMap),
};
