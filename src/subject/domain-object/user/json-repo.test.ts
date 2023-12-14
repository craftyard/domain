import { describe, expect, test } from 'bun:test';
import { ConsoleLogger } from 'rilata2/src/common/logger/console-logger';
import { UserAttrs, UserProfile } from '../../domain-data/user/params';
import { UserJsonRepository } from './json-repo';

const testUsers: UserAttrs[] = [
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
    userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471df',
    telegramId: 3290593910,
    type: 'employee',
    userProfile: {
      firstName: 'Bill',
      lastName: 'Oruell',
    },
  },
  {
    userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471df',
    telegramId: 5436134100,
    type: 'client',
    userProfile: {
      firstName: 'Jack',
      lastName: 'Smith',
    },
  },
];

const testUsersAsJson = JSON.stringify(testUsers);

const getUserAttrs = (attrs: Partial<UserAttrs>) => JSON.stringify([{ ...testUsers[2], ...attrs }]);

describe('UserAr json implementation repository tests', () => {
  const logger = new ConsoleLogger();

  const sut = new UserJsonRepository(testUsersAsJson, logger);
  test('успех, когда в списке есть несколько пользователей с одинаковым telegramId, то возвращаются все', () => {
    const result = sut.findByTelegramId(5436134100);
    expect(result).toEqual([
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
        userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471df',
        telegramId: 5436134100,
        type: 'client',
        userProfile: {
          firstName: 'Jack',
          lastName: 'Smith',
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
        type: 'employee',
        userProfile: {
          firstName: 'Bill',
          lastName: 'Oruell',
        },
      },
    ]);
  });

  test('успех, когда в списке нет пользователей с таким telegramId, приходит пустой массив', () => {
    const result = sut.findByTelegramId(55555533333);
    expect(result).toEqual([]);
  });

  test('провал, валидатор работает и ловит невалидные значения', () => {
    try {
      const userAttrsWithUndefinedUserId = getUserAttrs({ userId: undefined });
      (() => new UserJsonRepository(userAttrsWithUndefinedUserId, logger))();
      expect(true).toBe(false);
    } catch (error) {
      expect(String(error)).toContain('Входящие данные не валидны');
    }

    try {
      const userAttrsWithInvalidUserId = getUserAttrs(
        { userId: 'bc9166cb-ba37-43cb-93d3-ce6da27471dU' }, // last char not valid;
      );
      (() => new UserJsonRepository(userAttrsWithInvalidUserId, logger))();
      expect(true).toBe(false);
    } catch (error) {
      expect(String(error)).toContain('Входящие данные не валидны');
    }
  });
});
