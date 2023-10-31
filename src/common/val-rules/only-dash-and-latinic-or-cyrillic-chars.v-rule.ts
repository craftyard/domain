import { ValidationRuleAnswer } from 'rilata2/src/domain/validator/rules/types';
import { ValidationRule } from 'rilata2/src/domain/validator/rules/validation-rule';

export class OnlyHyphenAndLitinicOrCyrillicCharsValidationRule extends ValidationRule <'validate', string> {
  requirement = 'Строка может содержать слова только на латинице или на кирилице.';

  private latinic = /^[-a-z]+$/i;

  private cyrillic = /^[-а-яё]+$/i;

  validate(value: string): ValidationRuleAnswer {
    return this.latinic.test(value) || this.cyrillic.test(value)
      ? this.returnSuccess('SuccessRunNextRule')
      : this.returnFail('SaveErrorAndRunNextRule');
  }
}