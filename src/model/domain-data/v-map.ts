import { ValidatorMap } from 'rilata/src/domain/validator/field-validator/types';
import { UuidField } from 'rilata/src/domain/validator/field-validator/prepared-fields/string/uuid-field';
import { LiteralFieldValidator } from 'rilata/src/domain/validator/field-validator/literal-field-validator';
import { StringChoiceValidationRule } from 'rilata/src/domain/validator/rules/validate-rules/string/string-choice.v-rule';
import { MaxCharsCountValidationRule } from 'rilata/src/domain/validator/rules/validate-rules/string/max-chars-count.v-rule';
import { DtoFieldValidator } from 'rilata/src/domain/validator/field-validator/dto-field-validator';
import { ModelAttrs } from './params';

export const modelAttrsVMap: ValidatorMap<ModelAttrs> = {
  workshopId: new UuidField('workshopId'),
  userId: new UuidField('userId'),
  name: new LiteralFieldValidator('name', true, { isArray: false }, 'string', [
    new MaxCharsCountValidationRule(50),
  ]),
  category: new LiteralFieldValidator('category', true, { isArray: false }, 'string', [
    new StringChoiceValidationRule(['Мебель', 'Кухонная утварь', 'Игрушки']),
  ]),
};

export const userARValidator = new DtoFieldValidator('ModelAR', true, { isArray: false }, 'dto', modelAttrsVMap);
