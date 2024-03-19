// eslint-disable-next-line max-classes-per-file
import { Result } from 'rilata/src/common/result/types';
import { Mock, spyOn } from 'bun:test';
import { Module } from 'rilata/src/app/module/module';
import { WorkshopAttrs } from '../../workshop/domain-data/workshop/params';
import { WorkshopReadRepository } from '../../workshop/domain-object/workshop/repository';
import { UserDoesNotExistError } from '../domain-data/user/get-user/s-params';
import { UserAttrs } from '../domain-data/user/params';
import { UserAR } from '../domain-object/user/a-root';
import { UserCmdRepository } from '../domain-object/user/cmd-repository';
import { UserReadRepository } from '../domain-object/user/read-repository';

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace SubjectServiceFixtures {
  export class WorkshopRepoMock implements WorkshopReadRepository {
    findById(): Promise<WorkshopAttrs | undefined> {
      throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findWorkshopByUserId(): Promise<WorkshopAttrs | undefined> {
      throw new Error('Method not implemented.');
    }
  }

  export class UserRepoMock implements UserCmdRepository, UserReadRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findByTelegramId(_telegramId: number): Promise<UserAR[]> {
      throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUsers(): Promise<UserAttrs[]> {
      throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUser(_userId: string): Promise<Result<UserDoesNotExistError, UserAttrs>> {
      throw new Error('Method not implemented.');
    }
  }
  const workshopRepo = new WorkshopRepoMock();

  const userRepo = new UserRepoMock();

  export const resolverGetUserWorkshopRepoMock = spyOn(
    resolver,
    'getRepository',
  ).mockImplementation((key: unknown) => {
    if (key === WorkshopReadRepository) return workshopRepo;
    if (key === UserReadRepository) return userRepo;
    throw Error(`repository not found for key: ${key}`);
  }) as Mock<(...args: unknown[]) => UserRepoMock | WorkshopRepoMock>;

export const workshop: (WorkshopAttrs) = {
  workshopId: '6f91d305-3f4b-4a3d-9bef-72cf3757cc33',
  name: 'TheBestWorkshop',
  city: 'Freital',
  address: 'Gerti-Bruns-Weg 4/7 70279 Freital',
  location: { latitude: 88.958285, longitude: 117.84182 },
  employeesRole: { userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374', '3312a8d6-67ab-4e87-8a21-9d17f508fd5c'] },
};
export async function getServer<M extends Module>(
  runModules: M['moduleName'][] | 'all' = 'all',
): Promise<ServiceModulesBunServer> {
  const server = new ServiceModulesBunServer(runModules, 'test');
  const serverResolver = new ServiceModulesResolver();
  server.init(serverResolver);
  return server;
}
}
