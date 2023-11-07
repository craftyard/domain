import { QueryUseCase } from 'rilata2/src/app/use-case/query-use-case';
import { GetUcOptions, GetUcResult } from 'rilata2/src/app/use-case/types';
import {
  AuthentificationUserInputOptions,
  AuthentificationUserSuccessOut,
  AuthentificationUserErrors,
  AuthentificationUserUCParams,
} from '../../read-usecase/user-authentifiacaion/uc-params';
import { authUserVMap } from './v-map';
import { CommandValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';
import { UserRepository } from './repository';
// import { CommandValidatorMap } from 'rilata2/src/domain/validator/field-validator/types';

export class AuthentificationUserUC<
UC_PARAMS extends AuthentificationUserUCParams
> extends QueryUseCase<UC_PARAMS> {
  protected inputValidator: CommandValidatorMap<UC_PARAMS['inputOptions']['query']>;

  protected supportedCallers: 'AnonymousUser'[] = ['AnonymousUser'];

  protected validatorMap = authUserVMap;

  actionType = 'instance' as const;

  aggregateName = 'PersonAR' as const;

  actionName = 'authentificationUser';

  protected runDomain(options: AuthentificationUserInputOptions):
  Promise<AuthentificationUserErrors> {
    const userRepo = UserRepository.instance(this.actionIsAvailable);
    const getUserResult = await userRepo.getByTelegramId(options.query.attrs);
    throw new Error('Method not implemented.');
  }

  actionIsAvailable(userId: string, ...args: unknown[]): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

new AuthentificationUserUC().execute({
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
