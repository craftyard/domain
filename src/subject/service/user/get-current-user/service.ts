import { QueryService } from 'rilata/src/app/service/query-service';
import { RequestDodValidator, ServiceResult } from 'rilata/src/app/service/types';
import { success } from 'rilata/src/common/result/success';
import { storeDispatcher } from 'rilata/src/app/async-store/store-dispatcher';
import { DomainUser } from 'rilata/src/app/caller';
import { GettingCurrentUserServiceParams } from './s-params';
import { getCurrentUserValidator } from './v-map';
import { WorkshopReadRepository } from '../../../../workshop/domain-object/workshop/repository';
import { UserRepository } from '../../../domain-object/user/repository';

export class GettingCurrentUserService extends QueryService<GettingCurrentUserServiceParams> {
  aRootName: 'UserAR' = 'UserAR' as const;

  serviceName: 'getCurrentUser' = 'getCurrentUser' as const;

  protected supportedCallers = ['DomainUser'] as const;

  protected validator:
  RequestDodValidator<GettingCurrentUserServiceParams> = getCurrentUserValidator;

  protected async runDomain(): Promise<ServiceResult<GettingCurrentUserServiceParams>> {
    const workshopId = 'a29e2bfc-9f52-4f58-afbd-7a6f6f25d51e';
    const store = storeDispatcher.getStoreOrExepction();
    if (store.caller.type !== 'DomainUser') {
      throw this.logger.error('Пользователь не доменный пользователь');
    }
    const caller = store.caller as DomainUser;
    const { userId } = caller;
    const repoUsers = UserRepository.instance(this.moduleResolver);
    const result = await repoUsers.getUser(userId);
    if ((result).isFailure()) {
      throw await this.logger.error(`Пользователь с id: ${userId} подписанным токеном авторизации в базе данных не существует`);
    }
    const repoWorkshop = WorkshopReadRepository.instance(this.moduleResolver);
    const workshopAttrs = await repoWorkshop.findById(workshopId);
    if (!workshopAttrs) {
      throw await this.logger.error(`Workshop-a с workshopId: ${workshopId} не существует`);
    }
    return success({
      ...result.value,
      workshopName: workshopAttrs.name,
      workshopId: workshopAttrs.workshopId,
    });
  }
}
