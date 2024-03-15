import { QueryService } from 'rilata/src/app/service/query-service';
import { RequestDodValidator, ServiceResult } from 'rilata/src/app/service/types';
import { success } from 'rilata/src/common/result/success';
import { ModelReadRepository } from '../../domain-object/model/read-repository';
import { gettingWorkshopModelValidator } from '../../domain-data/model/get-model/v-map';
import { GetWorkshopModelRequestDod, GettingWorkshopModelServiceParams } from '../../domain-data/model/get-model/s-params';

export class GettingWorkshopModelService extends QueryService<GettingWorkshopModelServiceParams> {
  serviceName = 'getWorkshopModel' as const;

  aRootName = 'ModelAR' as const;

  protected supportedCallers = ['DomainUser'] as const;

  protected validator: RequestDodValidator<
  GettingWorkshopModelServiceParams
  > = gettingWorkshopModelValidator;

  protected async runDomain(
    requestDod: GetWorkshopModelRequestDod,
  ): Promise<ServiceResult<GettingWorkshopModelServiceParams>> {
    const repo = ModelReadRepository.instance(this.moduleResolver);
    const repoResult = await repo
      .getWorkshopModel(requestDod.attrs.workshopId, requestDod.attrs.modelId);
    if (repoResult.isSuccess()) {
      success(repoResult.value);
    }
    return repoResult;
  }
}
