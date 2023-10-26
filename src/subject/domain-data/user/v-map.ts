import { UuidField } from 'rilata2/src/domain/validator/field-validator/prepared-fields/string/uuid-field'
import { ValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { LiteralFieldValidator } from 'rilata2/src/domain/validator/field-validator/literal-field-validator';
import { DtoFieldValidator } from 'rilata2/src/domain/validator/field-validator/dto-field-validator';
import { OnlyLitinicOrCyrillicCharsValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/only-latinic-or-cyrillic-chars.v-rule';
import { RegexFormatValidationRule } from 'rilata2/src/domain/validator/rules/validate-rules/string/regex.field-v-rule';
import {
    UserProfile, UserAttrs,
} from './params';

const userprofileVMap: ValidatorMap<UserProfile> = {
    name: new LiteralFieldValidator("name", true, { isArray: false }, "string", [
        new OnlyLitinicOrCyrillicCharsValidationRule, 
        new RegexFormatValidationRule(/^(?=.{1,60}$)/, 'строка должна содержать от 1 до 60 символов'), 
        new RegexFormatValidationRule(/^[а-яёa-z,]+$/i, 'без пробелов и символов кроме "-"')])
}

const userVMap: ValidatorMap<UserAttrs> = {
    userId: new UuidField("userId"),
    telegramId: new LiteralFieldValidator("telegramId", true, { isArray: false}, "number", []),
    employeeId: new UuidField("employeeId"),
    userProfile: new DtoFieldValidator("userProfile", true, {isArray: false}, "dto", userprofileVMap),
};
