import { QueryUseCase } from 'rilata2/src/app/use-case/query-use-case';
import { GetUcResult } from 'rilata2/src/app/use-case/types';
import { ActionType } from 'rilata2/src/app/use-case/actionable/types';
import { failure } from 'rilata2/src/common/result/failure';
import { dodUtility } from 'rilata2/src/common/utils/domain-object/dod-utility';
import { PermissionDeniedError, UseCaseBaseErrors } from 'rilata2/src/app/use-case/error-types';
import { ErrorDod } from 'rilata2/src/domain/domain-object-data/common-types';
import { AuthentificationUserInputOptions, AuthentificationUserSuccessOut, AuthentificationUserErrors, AuthentificationInvalidUserErrors } from '../../read-usecase/user-authentifiacaion/uc-params';
import { UserRepository } from './repository';

export abstract class AuthentificationUserUseCase extends QueryUseCase<{
    inputOptions: AuthentificationUserInputOptions,
    successOut: AuthentificationUserSuccessOut,
    errors: AuthentificationUserErrors,
}> {
  protected supportedCallers: ('AnonymousUser')[] = ['AnonymousUser'];

  actionType = 'instance' as const;

  actionName = 'authentificationUser';

  protected async runDomain(options: AuthentificationUserInputOptions):
        Promise<GetUcResult<{
            inputOptions: AuthentificationUserInputOptions;
            successOut: AuthentificationUserSuccessOut;
            errors: AuthentificationUserErrors;
        }>> {
    const userRepo = UserRepository.instance(this);
    const getUserResult = await userRepo.getByTelegramId(options.query);
    if (getUserResult.telegramId) {
      return failure(
        dodUtility.getDomainErrorByType<>{
          
        }
      );
    }
    return true;
  }
}
// const userRepo = UserRepository.instance(this.supportedCallers);
// const getUserResult = await userRepo.instance(this.);
// // const getUserResult = await userRepo.getByTelegramId();
// throw new Error('Method not implemented.');

// actionIsAvailable(userId: string, ...args: unknown[]): Promise<boolean> {
//   throw new Error('Method not implemented.');
// }

// protected async runDomain(options: AuthentificationUserInputOptions):
//       Promise<GetUcResult<{
//           inputOptions: AuthentificationUserInputOptions;
//           successOut: AuthentificationUserSuccessOut;
//           errors: AuthentificationUserErrors;
//       }>> {
//   const userRepo = UserRepository.instance(this.moduleResolver);
//   const getUserResult = await userRepo.getByTelegramId(options.query);
//   if () {
//   }
//   throw new Error('Methsod not implemented.');
// }
// // }
// //   protected async runInitialChecks(..._args: unknown[]):
// //   Promise<GetUcResult<{
// //     inputOptions: AuthentificationUserInputOptions,
// //     successOut: AuthentificationUserSuccessOut,
// //     errors: AuthentificationUserErrors,
// //     }>> {
// //     throw Error();
// //      }
