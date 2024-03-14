/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mock, spyOn } from 'bun:test';
import { ServiceResult } from 'rilata/src/app/service/types';
import { UuidType } from 'rilata/src/common/types';
import { resolver } from 'rilata/tests/fixtures/test-resolver-mock';
import { GettingWorkshopModelServiceParams } from '../../domain-data/model/get-model/s-params';
import { ModelReadRepository } from '../../domain-object/model/read-repository';
import { ModelAttrs } from '../../domain-data/params';
import { GetWorkshopModelsRequestDod } from '../../domain-data/model/get-models/s-params';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ModelServiceFixtures {
    export class ModelReadRepositoryMock implements ModelReadRepository {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getWorkshopModel(workshopId: string, modelId: string): Promise<
      ServiceResult<GettingWorkshopModelServiceParams>> {
        throw new Error('Method not implemented.');
      }

      getWorkshopModels(workshopId: string): Promise<ModelAttrs[]> {
        throw new Error('Method not implemented.');
      }
    }

    export const requestId: UuidType = 'pb8a83cf-25a3-2b4f-86e1-2744de6d8374';
    export const workshopId: UuidType = 'e59725e7-39ae-48cd-aa10-a0f9a00c0fd9';

    export const validRequestDod: GetWorkshopModelsRequestDod = {
      meta: {
        name: 'getWorkshopModels',
        requestId,
        domainType: 'request',
      },
      attrs: {
        workshopId,
      },
    };

    export const resolverGetRepoMock = spyOn(
      resolver,
      'getRepository',
    ).mockReturnValue(
      new ModelReadRepositoryMock(),
    )as Mock<(...args: unknown[]) => ModelReadRepositoryMock>;

    export const workshopModels: ModelAttrs[] = [
      {
        modelId: '0f6df660-80dc-466c-b9f9-d8317f6f47dc',
        workshopId: 'e59725e7-39ae-48cd-aa10-a0f9a00c0fd9',
        name: 'Тубаретка',
        category: 'Мебель',
        images: [],
      },
      {
        modelId: '63f0cc04-5b00-4b4b-a098-37a5d8afe38f',
        workshopId: 'e59725e7-39ae-48cd-aa10-a0f9a00c0fd9',
        name: 'Нож',
        category: 'Кухонная утварь',
        images: [],
      },
      {
        modelId: '6ccb8dc3-90d3-4e8e-b084-b3300c3e8512',
        workshopId: 'e59725e7-39ae-48cd-aa10-a0f9a00c0fd9',
        name: 'Машинка',
        category: 'Игрушки',
        images: [],
      },
    ];
}
