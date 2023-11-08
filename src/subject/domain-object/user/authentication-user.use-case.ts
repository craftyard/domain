import { QueryUseCase } from 'rilata2/src/app/use-case/query-use-case';
import { GeneralQueryUcParams, GetUcOptions, GetUcResult } from 'rilata2/src/app/use-case/types';
import { CommandValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { Caller, CallerType } from 'rilata2/src/app/caller';
import { success } from 'rilata2/src/common/result/success';
import { dodUtility } from 'rilata2/src/common/utils/domain-object/dod-utility';
import { Locale } from 'rilata2/src/domain/locale';
import { failure } from 'rilata2/src/common/result/failure';
import { BadRequestError, ValidationError } from 'rilata2/src/app/use-case/error-types';
import { Result } from 'rilata2/src/common/result/types';
import { authUserVMap } from './v-map';
import { AuthentificationUserUCParams } from '../../read-usecase/user-authentifiacaion/uc-params';
import { AuthentificationUserError } from './error-type';

export class AuthentificationUserUCQuery extends QueryUseCase<AuthentificationUserUCParams> {
  protected supportedCallers: ReadonlyArray<CallerType> = ['AnonymousUser'];

  protected inputValidator: CommandValidatorMap<AuthentificationUserUCParams['inputOptions']['query']>;

  protected validatorMap = authUserVMap;

  actionType = 'instance' as const;

  aggregateName = 'PersonAR' as const;

  actionName = 'authentificationUser';

  protected runDomain(options: GetUcOptions<AuthentificationUserUCParams>)
  :Promise<GetUcResult<AuthentificationUserUCParams>> {
    throw new Error('Method not implemented.');
  }

  protected checkCallerPermission(caller: Caller): GetUcResult<AuthentificationUserUCParams> {
    if (this.supportedCallers.includes(caller.type)) return success(undefined);

    const err = dodUtility.getDomainErrorByType<AuthentificationUserError<Locale>>(
      'AuthentificationUserError',
      'Действие не доступно',
      { Caller: this.supportedCallers },
    );
    return failure(err);
  }

  protected checkValidations(
    input: GetUcOptions<AuthentificationUserUCParams>,
  ): Result<ValidationError | BadRequestError<Locale>, undefined> {
    const result = this.validatorMap.validate(input);

    if (result.isFailure()) {
      const err: ValidationError = {
        name: 'validation-error',
        domainType: 'error',
        errorType: 'app-error',
        errors: result.value,
      };
      return failure(err);
    }
    return result;
  }

  actionIsAvailable(userId: string, ...args: unknown[]): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

new AuthentificationUserUCQuery().execute({
  query: {
    attrs: {
      telegram_id: '',
      first_name: '',
      last_name: '',
      username: '',
      photo_url: '',
      auth_date: '',
      hash: '',
    },
    name: 'AuthentificationUserQuery',
  },
  caller: {
    type: 'ModuleCaller',
    name: '',
    user: {
      type: 'AnonymousUser',
      requestID: '',
    },
  },
});
