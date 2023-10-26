import { describe, expect, test } from 'bun:test';
import { UserAttrs } from '../../domain-data/user/params';
import { UserArJsonRepositoryImpl } from './user-json-impl';

const testUsers: UserAttrs[] = [
  {
    userId: 'fa91a299-105b-4fb0-a056-92634249130c',
    telegramId: 5436134100,
    employeerId: 'fa505e1a-d875-41f3-adcb-1c15047fe28a',
    userProfile: {
      name: 'Jack',
    },
  },
  {
    userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471df',
    telegramId: 3290593910,
    employeerId: 'b1c357e6-fe52-4fcd-b61c-db98af09d9cc',
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

describe('UserAr json implementation repository tests', () => {
  describe('поиск пользователя по telegramId', () => {
    const sut = new UserArJsonRepositoryImpl(testUsersAsJson);
    test('успех, когда в списке есть несколько пользователей с одинаковым telegramId, то возвращаются все', () => {
      const result = sut.findByTelegramId(5436134100);
      expect(result).toEqual([
        {
          userId: 'fa91a299-105b-4fb0-a056-92634249130c',
          telegramId: 5436134100,
          employeerId: 'fa505e1a-d875-41f3-adcb-1c15047fe28a',
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
      expect(true).toBe(false);
    });

    test('провал, когда в списке нет пользователей с таким telegramId', () => {
      expect(true).toBe(false);
    });

    test('провал, при загрузке если есть объект без userId, то выкинется ошибка', () => {
      expect(true).toBe(false);
    });

    test('провал, при загрузке если есть объект без telegramId, то выкинется ошибка', () => {
      expect(true).toBe(false);
    });

    test('провал, при загрузке если есть объект без userProfile, то выкинется ошибка', () => {
      expect(true).toBe(false);
    });

    test('провал, при загрузке если в userProfile не указан атрибут name, то выкинется ошибка', () => {
      expect(true).toBe(false);
    });
  });
});
