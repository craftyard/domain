import { TestBatchRecords } from 'rilata/src/app/database/types';
import { Module } from 'rilata/src/app/module/module';
import { ModelRepository } from '../domain-object/model/repo';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ServiceModulesFixtures {
  export const repoFixtures: TestBatchRecords<ModelRepository['testRepo']> = ({
    // workshop_repo: [
    //   {
    //     version: 0,
    //     workshopId: 'a29e2bfc-9f52-4f58-afbd-7a6f6f25d51e',
    //     name: 'Dedok',
    //     city: 'Uralsk',
    //     address: 'Kurmangazy 27',
    //     location: {
    //       latitude: 51.198268,
    //       longitude: 51.380912,
    //     },
    //     employeesRole: {
    //       userIds: [
    //         'fb8a83cf-25a3-4b4f-86e1-27f6de6d8372',
    //         'c89b5d14-7a35-4b07-8c4b-52e49ea349eb',
    //         'd462f0c6-25c4-45a3-bcf5-7d25d2a9a8df',
    //         '8e7f101f-82f6-4c45-8c17-316a61cc367d',
    //         '94dbd841-6f1d-4a42-8f65-4e5bb76a21c7',
    //         'b0ee48d6-12e9-4682-a8e6-77320921f7df',
    //       ],
    //     },
    //   },
    // ],
    // model_repo: [
    //   {
    //     id: 'b433034e-8090-4c7d-8738-8cb78bbc6792',
    //     firstName: 'Bill',
    //     lastName: 'Geits',
    //     iin: '123123123123',
    //     contacts: {
    //       emails: [{ type: 'corporate', email: 'bill@microsoft.com' }],
    //       techSupportComments: ['you should never send letters'],
    //     },
    //     version: 0,
    //   },
    // ],
    // user_repo: [
    //   {
    //     userId: 'edc6bfdc-ae44-4e7d-a35e-f26a0e92ffdd',
    //     personIin: '123123123123',
    //     version: 0,
    //   },
    // ],
  });

  export async function getServer<M extends Module>(
    runModules: M['moduleName'][] | 'all' = 'all',
  ): Promise<ServiceModulesBunServer> {
    const server = new ServiceModulesBunServer(runModules, 'test');
    const serverResolver = new ServiceModulesResolver();
    server.init(serverResolver);
    return server;
  }
}
