import { QueryService } from 'rilata/src/app/service/query-service';
import { RequestDodValidator, ServiceResult } from 'rilata/src/app/service/types';
import { success } from 'rilata/src/common/result/success';
import { findWorkshopByUserIdValidator } from '../domain-data/workshop/find-workshop-by-user-id/s-vmap';
import { FindWorkshopByUserIdRequestDod, FindWorkshopByUserIdServiceParams } from '../domain-data/workshop/find-workshop-by-user-id/s-params';
import { UserReadRepository } from '../../subject/domain-object/user/read-repository';
import { WorkshopRepository } from '../domain-object/workshop/repo';

export class FindWorkshopByUserIdService extends QueryService<FindWorkshopByUserIdServiceParams> {
  serviceName = 'findWorkshopByUserId' as const;

  aRootName: 'WorkshopAR' = 'WorkshopAR' as const;

  protected supportedCallers = ['DomainUser'] as const;

  protected validator: RequestDodValidator<
  FindWorkshopByUserIdServiceParams
  > = findWorkshopByUserIdValidator;

  protected async runDomain(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    requestDod: FindWorkshopByUserIdRequestDod,
  ): Promise<ServiceResult<FindWorkshopByUserIdServiceParams>> {
    const repoWorkshop = WorkshopRepository.instance(this.moduleResolver);
    const workshop = await repoWorkshop.findWorkshopByUserId(requestDod.attrs.userId);
    if (!workshop) {
      return success(undefined);
    }
    const repoUsers = UserReadRepository.instance(this.moduleResolver);
    const usersAttrs = await repoUsers.getUsers(workshop.employeesRole.userIds);
    return success({
      ...workshop,
      employeesRole: usersAttrs,
    });
  }
}
