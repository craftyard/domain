import { describe, expect, test } from 'bun:test';
import { ConsoleLogger } from 'rilata2/src/common/logger/console-logger';
import { WorkshopJsonRepository } from './repo';
import { testWorkshopsRecordsAsJson } from './fixture';

describe('Тесты для получения workshopa по userid', () => {
  const logger = new ConsoleLogger();

  const sut = new WorkshopJsonRepository(testWorkshopsRecordsAsJson, logger);
  test('Успех, получен обьект мастерской', async () => {
    const workshop = await sut.findWorkshopByUserId('3312a8d6-67ab-4e87-8a21-9d17f508fd5c');
    expect(workshop).toEqual({
      workshopId: '6f91d305-3f4b-4a3d-9bef-72cf3757cc33',
      name: 'Nurbolat',
      city: 'Freital',
      address: 'Gerti-Bruns-Weg 4/7 70279 Freital',
      location: {
        latitude: 88.958285,
        longitude: 117.84182,
      },
      employeesRole: {
        userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374', '3312a8d6-67ab-4e87-8a21-9d17f508fd5c',
        ],
      },
    });
  });
  test('Провал, мастерская по такому пользователю не найден', async () => {
    const userId = '3332a8d6-67ab-4e87-8a21-9d17f508fd5c';
    const workshop = await sut.findWorkshopByUserId(userId);
    expect(workshop).toBeUndefined();
  });
});
