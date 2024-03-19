import { QueryService } from 'rilata/src/app/service/query-service';
import { ServiceResult } from 'rilata/src/app/service/types';
import { dodUtility } from 'rilata/src/common/utils/domain-object/dod-utility';
import { failure } from 'rilata/src/common/result/failure';
import { TokenCreator } from 'rilata/src/app/jwt/token-creator.interface';
import {
  ManyAccountNotSupportedError,
  TelegramUserDoesNotExistError,
  UserAuthentificationRequestDod,
  UserAuthentificationServiceParams,
} from './s-params';
import { userAuthentificationValidator } from './v-map';
import { UserReadRepository } from '../../../domain-object/user/read-repository';
import { UserAuthentificationDomainQuery } from '../../../domain-data/user/user-authentification/a-params';

export class UserAuthentificationService extends QueryService<UserAuthentificationServiceParams> {
  public serviceName: 'userAuthentification' = 'userAuthentification' as const;

  public aRootName: 'UserAR' = 'UserAR' as const;

  protected supportedCallers: readonly ('ModuleCaller' | 'AnonymousUser' | 'DomainUser')[] = ['AnonymousUser'];

  protected validator = userAuthentificationValidator;

  protected async runDomain(
    actionDod: UserAuthentificationRequestDod,
  ): Promise<ServiceResult<UserAuthentificationServiceParams>> {
    const userRepo = UserReadRepository.instance(this.moduleResolver);
    const telegramId = actionDod.attrs.id;
    const users = await userRepo.findByTelegramId(telegramId);

    if (users.length > 1) {
      const err: ManyAccountNotSupportedError = dodUtility.getDomainError(
        'ManyAccountNotSupportedError',
        'У вас с одним аккаунтом telegram имеется много аккаунтов, к сожалению сейчас это не поддерживается. Обратитесь в техподдержку, чтобы вам помогли решить эту проблему.',
        { telegramId },
      );
      return failure(err);
    } if (users.length === 0) {
      const err: TelegramUserDoesNotExistError = dodUtility.getDomainError(
        'TelegramUserDoesNotExistError',
        'У вас нет аккаунта.',
        { telegramId },
      );
      return failure(err);
    }

    const userAr = users[0];

    const userAuthQuery: UserAuthentificationDomainQuery = {
      botToken: this.moduleResolver.getRealisation('botToken') as unknown as string,
      telegramAuthDTO: actionDod.attrs,
    };
    const tokenCreator = TokenCreator.instance(this.moduleResolver);
    return userAr.userAuthentification(userAuthQuery, tokenCreator);
  }
}
