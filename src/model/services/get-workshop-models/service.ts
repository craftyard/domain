import { QueryService } from 'rilata/src/app/service/query-service';
import { RequestDodValidator, ServiceResult } from 'rilata/src/app/service/types';
import { success } from 'rilata/src/common/result/success';
import { GetWorkshopModelsRequestDod, GetingWorkshopModelsServiceParams } from '../../domain-data/model/get-models/s-params';
import { ModelReadRepository } from '../../domain-object/model/read-repository';
import { getingWorkshopModelsValidator } from '../../domain-data/model/get-models/v-map';

export class GettingWorkshopModelsService extends QueryService<GetingWorkshopModelsServiceParams> {
  serviceName = 'getWorkshopModels' as const;

  aRootName = 'ModelAR' as const;

  protected supportedCallers = ['DomainUser'] as const;

  protected validator: RequestDodValidator<
  GetingWorkshopModelsServiceParams
  > = getingWorkshopModelsValidator;

  protected async runDomain(
    requestDod: GetWorkshopModelsRequestDod,
  ): Promise<ServiceResult<GetingWorkshopModelsServiceParams>> {
    const repo = ModelReadRepository.instance(this.moduleResolver);
    return success(await repo.getWorkshopModels(requestDod.attrs.workshopId));
  }
}
