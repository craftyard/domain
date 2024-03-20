/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  describe, test, expect, spyOn, afterEach,
} from 'bun:test';
import { setAndGetTestStoreDispatcher } from 'rilata/tests/fixtures/test-thread-store-mock';
import { UuidType } from 'rilata/src/common/types';
import { UserAttrs } from '../../../domain-data/user/params';
import { GetUsersRequestDod } from './s-params';
import { SubjectServiceFixtures as fixtures } from '../../fixture';
import { SubjectModule } from '../../../module';
import { ServiceModulesFixtures } from '../../server-fixtures';

describe('тесты для use-case getUsers', () => {
  const testSever = await ServiceModulesFixtures.getServer<SubjectModule>(['SubjectModule']);
  const module = testSever.getModule<SubjectModule>('AuthModule');
  const resolver = module.getModuleResolver();
  const store = setAndGetTestStoreDispatcher({
    requestId,
    moduleResolver: resolver,
  }).getStoreOrExepction();
  const sut = module.getServiceByName<GetingUsersService>('getUsers');

  const users: UserAttrs[] = [
    {
      userId: 'fa91a299-105b-4fb0-a056-92634249130c',
      telegramId: 5436134100,
      type: 'employee',
      userProfile: {
        firstName: 'Jack',
        lastName: 'Smith',
      },
    },
    {
      userId: '493f5cbc-f572-4469-9cf1-3702802e6a31',
      telegramId: 3290593910,
      type: 'employee',
      userProfile: {
        firstName: 'Bill',
        lastName: 'Oruell',
      },
    },
  ];

  const requestId: UuidType = 'pb8a83cf-25a3-2b4f-86e1-2744de6d8374';

  const validActionDod: GetUsersRequestDod = {
    meta: {
      name: 'getUsers',
      requestId,
      domainType: 'request',
    },
    attrs: {
      userIds: [
        'fa91a299-105b-4fb0-a056-92634249130c',
        '493f5cbc-f572-4469-9cf1-3702802e6a31',
      ],
    },
  };

  const userRepo = fixtures.resolverGetUserWorkshopRepoMock(UserReadRepository) as
    UserReadRepository;
  const repoGetUserMock = spyOn(userRepo, 'getUsers');

  afterEach(() => {
    repoGetUserMock.mockClear();
  });

  test('успех, запрос для пользователя нормально проходит', async () => {
    repoGetUserMock.mockResolvedValueOnce([...users]);
    setAndGetTestStoreDispatcher('pb8a83cf-25a3-2b4f-86e1-2744de6d8374');
    const result = await sut.execute({ ...validActionDod });
    expect(result.isSuccess()).toBe(true);
    expect(result.value as GetingUsersOut).toEqual(users);
    expect(repoGetUserMock).toHaveBeenCalledTimes(1);
    expect(repoGetUserMock.mock.calls[0][0]).toEqual([
      'fa91a299-105b-4fb0-a056-92634249130c',
      '493f5cbc-f572-4469-9cf1-3702802e6a31',
    ]);
  });

  test('провал, запрещен доступ неавторизованному пользователю', async () => {
    setAndGetTestStoreDispatcher('pb8a83cf-25a3-2b4f-86e1-2744de6d8374', {
      type: 'AnonymousUser',
    });
    const result = await sut.execute({ ...validActionDod });
    expect(result.isFailure()).toBe(true);
    expect(result.value).toEqual({
      locale: {
        text: 'Действие не доступно',
        hint: {
          allowedOnlyFor: ['DomainUser'],
        },
      },
      name: 'Permission denied',
      meta: {
        errorType: 'domain-error',
        domainType: 'error',
      },
    });
  });

  test('провал, не прошла валидация', async () => {
    repoGetUserMock.mockResolvedValueOnce([...users]);
    setAndGetTestStoreDispatcher('pb8a83cf-25a3-2b4f-86e1-2744de6d8374');
    const notValidInputOpt = {
      ...validActionDod,
      attrs: {
        userIds: [
          'fa91a299-105b-4fb0-a056-9263429133c', // not valid
          '493f5cbc-f572-4469-9cf1-3702802e6a31',
        ],
      },
    };
    const result = await sut.execute(notValidInputOpt);
    expect(result.isFailure()).toBe(true);
    expect(result.value).toEqual({
      name: 'Validation error',
      meta: {
        domainType: 'error',
        errorType: 'app-error',
      },
      errors: {
        getUsers: {
          0: {
            userIds: [
              {
                text: 'Значение должно соответствовать формату UUID',
                hint: {},
                name: 'UUIDFormatValidationRule',
              },
            ],
          },
        },
      },
    });
    expect(repoGetUserMock).toHaveBeenCalledTimes(0);
  });
});