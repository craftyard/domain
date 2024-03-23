import { QueryService } from 'rilata/src/app/service/query-service';
import { RequestDodValidator, ServiceResult } from 'rilata/src/app/service/types';
import { GetUserRequestDod, GetUserServiceParams } from './s-params';
import { getUserValidator } from './v-map';
import { UserRepository } from '../../../domain-object/user/repository';

export class GettingUserService extends QueryService<GetUserServiceParams> {
  public aRootName: 'UserAR' = 'UserAR' as const;

  public serviceName: 'getUser' = 'getUser' as const;

  protected supportedCallers: readonly ('ModuleCaller' | 'AnonymousUser' | 'DomainUser')[] = ['DomainUser'];

  protected validator: RequestDodValidator<GetUserServiceParams> = getUserValidator;

  protected async runDomain(
    requestDod: GetUserRequestDod,
  ): Promise<ServiceResult<GetUserServiceParams>> {
    const repo = UserRepository.instance(this.moduleResolver);
    return repo.getUser(requestDod.attrs.userId);
  }
}
