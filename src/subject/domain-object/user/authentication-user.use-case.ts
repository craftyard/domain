import { QueryUseCase } from 'rilata2/src/app/use-case/query-use-case';
import { GetUcResult } from 'rilata2/src/app/use-case/types';
import { CommandValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import {
  AuthentificationUserInputOptions,
  AuthentificationUserSuccessOut,
  AuthentificationUserErrors,
  AuthentificationUserUCQuery,
  AuthentificationUserUCParams,
} from '../../read-usecase/user-authentifiacaion/uc-params';

export abstract class AuthentificationUserUseCase extends QueryUseCase<{
    inputOptions: AuthentificationUserInputOptions,
    successOut: AuthentificationUserSuccessOut,
    errors: AuthentificationUserErrors,
}> {
  protected inputValidator = (this.moduleResolver);

  protected supportedCallers = ('AnonymousUser') as const;

  protected abstract validatorMap: CommandValidatorMap<AuthentificationUserUCParams['inputOptions']['query']>;

  actionType = 'instance' as const;

  aggregateName = 'PersonAR' as const;

  actionName = 'authentificationUser';

  protected async runDomain(options: AuthentificationUserInputOptions):
  Promise<GetUcResult<AuthentificationUserErrors>> {
    throw Error('МЕТОД ЕЩЕ НЕ РЕАЛИЗОВАН');
  }
}
