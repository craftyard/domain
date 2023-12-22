import { describe, expect, test } from 'bun:test';
import { ConsoleLogger } from 'rilata2/src/common/logger/console-logger';
import { UserJsonRepository } from './repo';
import { testUsersAsJson } from './fixture';

describe('UserAr json implementation repository tests', () => {
  const logger = new ConsoleLogger();

  const sut = new UserJsonRepository(testUsersAsJson, logger);
  test('успех, когда в списке есть несколько пользователей с одинаковым telegramId, то возвращаются все', async () => {
    const result = await sut.findByTelegramId(5436134100);
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

  test('успех, когда в списке есть один пользователь, то возвращается один пользователь', async () => {
    const result = await sut.findByTelegramId(3290593910);
    expect(result).toEqual([
      {
        userId: '493f5cbc-f572-4469-9cf1-3702802e6a31',
        telegramId: 3290593910,
        type: 'employee',
        userProfile: {
          firstName: 'Bill',
          lastName: 'Oruell',
        },
      },
    ]);
  });

  test('успех, когда в списке нет пользователей с таким telegramId, приходит пустой массив', async () => {
    const result = await sut.findByTelegramId(55555533333);
    expect(result).toEqual([]);
  });
});