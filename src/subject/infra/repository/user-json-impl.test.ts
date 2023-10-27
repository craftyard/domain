import { describe, expect, test } from 'bun:test';
import { UserAttrs, UserProfile } from '../../domain-data/user/params';
import { UserArJsonRepositoryImpl } from './user-json-impl';

const testUsers: UserAttrs[] = [
  {
    userId: 'fa91a299-105b-4fb0-a056-92634249130c',
    telegramId: 5436134100,
    employeeId: 'fa505e1a-d875-41f3-adcb-1c15047fe28a',
    userProfile: {
      name: 'Jack',
    },
  },
  {
    userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471df',
    telegramId: 3290593910,
    employeeId: 'b1c357e6-fe52-4fcd-b61c-db98af09d9cc',
    userProfile: {
      name: 'Bill',
    },
  },
  {
    userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471df',
    telegramId: 5436134100,
    userProfile: {
      name: 'Jack',
    },
  },
];

const testUsersAsJson = JSON.stringify(testUsers);

const getUserAttrs = (attrs: Partial<UserAttrs>) => {
  const user = {
    userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471df',
    telegramId: 5436134100,
    userProfile: {
      name: 'Jack',
    },
  };
  return JSON.stringify([{ ...user, ...attrs }]);
};

describe('UserAr json implementation repository tests', () => {
  describe('проверка инвариантов при загрузке объекта userAr', () => {
    test('провал, проверка на валидность userId и выкидывается ошибка', () => {
      const notFoundUserId = getUserAttrs({ userId: undefined });
      const notFoundCb = () => new UserArJsonRepositoryImpl(notFoundUserId);
      expect(notFoundCb).toThrow('not valid userId');

      // last chat not valid;
      const notValidUserId = getUserAttrs({ userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471dU' });
      const notValidCb = () => new UserArJsonRepositoryImpl(notValidUserId);
      expect(notValidCb).toThrow('not valid userId');
    });

    test('провал, при загрузке если есть объект без telegramId, то выкинется ошибка', () => {
      const notFoundTelegramId = getUserAttrs({ telegramId: undefined });
      const notFoundCb = () => new UserArJsonRepositoryImpl(notFoundTelegramId);
      expect(notFoundCb).toThrow('not valid userId');

      const notValidTelegramId = getUserAttrs({ telegramId: ('5436134100' as unknown as number) });
      const notValidCb = () => new UserArJsonRepositoryImpl(notValidTelegramId);
      expect(notValidCb).toThrow('not valid userId');
    });

    test('провал, при загрузке если есть объект без userProfile, то выкинется ошибка', () => {
      const notFoundUserProfile = getUserAttrs({ userProfile: undefined });
      const notFoundCb = () => new UserArJsonRepositoryImpl(notFoundUserProfile);
      expect(notFoundCb).toThrow('not valid userId');

      const notValidUserProfile = getUserAttrs({ userProfile: ('5436134100' as unknown as UserProfile) });
      const notValidCb = () => new UserArJsonRepositoryImpl(notValidUserProfile);
      expect(notValidCb).toThrow('not valid userId');
    });

    test('провал, при загрузке если в userProfile не указан атрибут name, то выкинется ошибка', () => {
      const notFoundUserNameAttr = getUserAttrs(
        { userProfile: { name: undefined as unknown as string } },
      );
      const notFoundCb = () => new UserArJsonRepositoryImpl(notFoundUserNameAttr);
      expect(notFoundCb).toThrow('not valid userId');

      const notValidUserNameAttr = getUserAttrs(
        { userProfile: { name: 5 as unknown as string } },
      );
      const notValidCb = () => new UserArJsonRepositoryImpl(notValidUserNameAttr);
      expect(notValidCb).toThrow('not valid userId');
    });

    test('убрать default с класса репо', () => {
      expect(true).toBe(false);
    });
  });

  describe('поиск пользователя по telegramId', () => {
    const sut = new UserArJsonRepositoryImpl(testUsersAsJson);
    test('успех, когда в списке есть несколько пользователей с одинаковым telegramId, то возвращаются все', () => {
      const result = sut.findByTelegramId(5436134100);
      expect(result).toEqual([
        {
          userId: 'fa91a299-105b-4fb0-a056-92634249130c',
          telegramId: 5436134100,
          employeeId: 'fa505e1a-d875-41f3-adcb-1c15047fe28a',
          userProfile: {
            name: 'Jack',
          },
        },
        {
          userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471df',
          telegramId: 5436134100,
          userProfile: {
            name: 'Jack',
          },
        },
      ]);
    });

    test('успех, когда в списке есть один пользователь, то возвращается один пользователь', () => {
      const result = sut.findByTelegramId(3290593910);
      expect(result).toEqual([
        {
          userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471df',
          telegramId: 3290593910,
          employeeId: 'b1c357e6-fe52-4fcd-b61c-db98af09d9cc',
          userProfile: {
            name: 'Bill',
          },
        },
      ]);
    });

    test('успех, когда в списке нет пользователей с таким telegramId, приходит пустой массив', () => {
      const result = sut.findByTelegramId(55555533333);
      expect(result).toEqual([]);
    });
  });
});
