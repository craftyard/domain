import { describe, expect, test } from 'bun:test';
import { WorkshopAttrs } from './params';
import { workshopAttrsVMap } from './v-map';

describe('test workshopAttrs', () => {
  test('succes, all values are valid', () => {
    const workshopAttrs: WorkshopAttrs = {
      workshopId: '6f91d305-3f4b-4a3d-9bef-72cf3757cc33',
      name: 'Nurbolat',
      city: 'Germany',
      address: 'Gerti-Bruns-Weg 4/7 70279 Freital',
      location: { latitude: 88.958285, longitude: 117.84182 },
      employeesRole: { userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374'] },
    };
    expect(workshopAttrsVMap.workshopId.validate(workshopAttrs.workshopId).value).toBeUndefined();
    expect(workshopAttrsVMap.name.validate(workshopAttrs.name).value).toBeUndefined();
    expect(workshopAttrsVMap.city.validate(workshopAttrs.city).value).toBeUndefined();
    expect(workshopAttrsVMap.address.validate(workshopAttrs.address).value).toBeUndefined();
    expect(workshopAttrsVMap.location.validate(workshopAttrs.location).value).toBeUndefined();
    // eslint-disable-next-line max-len
    expect(workshopAttrsVMap.employeesRole.validate(workshopAttrs.employeesRole).value).toBeUndefined();
  });

  test('failure, workshopId value does not match UUID format', () => {
    const workshopAttrs: WorkshopAttrs = {
      workshopId: '6f91d31240050sfai72cf3757cc33',
      name: 'Nurbolat',
      city: 'Germany',
      address: 'Gerti-Bruns-Weg 4/7 70279 Freital',
      location: { latitude: 88.958285, longitude: 117.84182 },
      employeesRole: { userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374'] },
    };
    expect(workshopAttrsVMap.workshopId.validate(workshopAttrs.workshopId).value).toEqual({
      workshopId: [
        {
          text: 'Значение должно соответствовать формату UUID',
          hint: {},
          name: 'UUIDFormatValidationRule',
        },
      ],
    });
    expect(workshopAttrsVMap.name.validate(workshopAttrs.name).value).toBeUndefined();
    expect(workshopAttrsVMap.city.validate(workshopAttrs.city).value).toBeUndefined();
    expect(workshopAttrsVMap.address.validate(workshopAttrs.address).value).toBeUndefined();
    expect(workshopAttrsVMap.location.validate(workshopAttrs.location).value).toBeUndefined();
    // eslint-disable-next-line max-len
    expect(workshopAttrsVMap.employeesRole.validate(workshopAttrs.employeesRole).value).toBeUndefined();
  });

  test('failure, A name line cannot contain two languages at the same time', () => {
    const workshopAttrs: WorkshopAttrs = {
      workshopId: '6f91d305-3f4b-4a3d-9bef-72cf3757cc33',
      name: 'Nurbolat-Нурболат',
      city: 'Germany',
      address: 'Gerti-Bruns-Weg 4/7 70279 Freital',
      location: { latitude: 88.958285, longitude: 117.84182 },
      employeesRole: { userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374'] },
    };
    expect(workshopAttrsVMap.workshopId.validate(workshopAttrs.workshopId).value).toBeUndefined();
    expect(workshopAttrsVMap.name.validate(workshopAttrs.name).value).toEqual({
      name: [
        {
          text: 'Строка не должна содержать символы кроме "-"(дефис) и может содержать слова только на латинице или на кирилице.',
          hint: {},
          name: 'OnlyDashAndLitinicOrCyrillicCharsValidationRule',
        },
      ],
    });
    expect(workshopAttrsVMap.city.validate(workshopAttrs.city).value).toBeUndefined();
    expect(workshopAttrsVMap.address.validate(workshopAttrs.address).value).toBeUndefined();
    expect(workshopAttrsVMap.location.validate(workshopAttrs.location).value).toBeUndefined();
    // eslint-disable-next-line max-len
    expect(workshopAttrsVMap.employeesRole.validate(workshopAttrs.employeesRole).value).toBeUndefined();
  });
  test('failure, A city line cannot contain two languages at the same time', () => {
    const workshopAttrs: WorkshopAttrs = {
      workshopId: '6f91d305-3f4b-4a3d-9bef-72cf3757cc33',
      name: 'Nurbolat',
      city: 'Germany - германия',
      address: 'Gerti-Bruns-Weg 4/7 70279 Freital',
      location: { latitude: 88.958285, longitude: 117.84182 },
      employeesRole: { userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374'] },
    };
    expect(workshopAttrsVMap.workshopId.validate(workshopAttrs.workshopId).value).toBeUndefined();
    expect(workshopAttrsVMap.name.validate(workshopAttrs.name).value).toBeUndefined();
    expect(workshopAttrsVMap.city.validate(workshopAttrs.city).value).toEqual({
      city: [
        {
          text: 'Строка не должна содержать символы кроме "-"(дефис) и может содержать слова только на латинице или на кирилице.',
          name: 'OnlyDashAndLitinicOrCyrillicCharsValidationRule',
          hint: {},
        },
      ],
    });
    expect(workshopAttrsVMap.address.validate(workshopAttrs.address).value).toBeUndefined();
    expect(workshopAttrsVMap.location.validate(workshopAttrs.location).value).toBeUndefined();
    // eslint-disable-next-line max-len
    expect(workshopAttrsVMap.employeesRole.validate(workshopAttrs.employeesRole).value).toBeUndefined();
  });

  test('failure, workshopAttrs address has string length violation', () => {
    const workshopAttrs: WorkshopAttrs = {
      workshopId: '6f91d305-3f4b-4a3d-9bef-72cf3757cc33',
      name: 'Nurbolat',
      city: 'Germany',
      address: 'Gerti-Bruns-Weg 4/7 70279 Freital and sooooooooooooooooooooooooooooooooooooooo looooooooooooooooooooooooooooooooong address i think is in the 250 or more but i not need more i need only 250 and ending this test yea im realy dont like it but i need do this',
      location: { latitude: 88.958285, longitude: 117.84182 },
      employeesRole: { userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374'] },
    };
    expect(workshopAttrsVMap.workshopId.validate(workshopAttrs.workshopId).value).toBeUndefined();
    expect(workshopAttrsVMap.name.validate(workshopAttrs.name).value).toBeUndefined();
    expect(workshopAttrsVMap.city.validate(workshopAttrs.city).value).toBeUndefined();
    expect(workshopAttrsVMap.address.validate(workshopAttrs.address).value).toEqual({
      address: [
        {
          text: 'Длина строки должна быть не больше {{maxCount}}',
          name: 'MaxCharsCountValidationRule',
          hint: {
            maxCount: 250,
          },
        },
      ],
    });
    expect(workshopAttrsVMap.location.validate(workshopAttrs.location).value).toBeUndefined();
    // eslint-disable-next-line max-len
    expect(workshopAttrsVMap.employeesRole.validate(workshopAttrs.employeesRole).value).toBeUndefined();
  });

  test('failure, coordinates entered incorrectly, minimum value latitude 90 degrees', () => {
    const workshopAttrs: WorkshopAttrs = {
      workshopId: '6f91d305-3f4b-4a3d-9bef-72cf3757cc33',
      name: 'Nurbolat',
      city: 'Germany',
      address: 'Gerti-Bruns-Weg 4/7 70279 Freital',
      location: { latitude: -91.958285, longitude: 117.84182 },
      employeesRole: { userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374'] },
    };
    expect(workshopAttrsVMap.workshopId.validate(workshopAttrs.workshopId).value).toBeUndefined();
    expect(workshopAttrsVMap.name.validate(workshopAttrs.name).value).toBeUndefined();
    expect(workshopAttrsVMap.city.validate(workshopAttrs.city).value).toBeUndefined();
    expect(workshopAttrsVMap.address.validate(workshopAttrs.address).value).toBeUndefined();
    expect(workshopAttrsVMap.location.validate(workshopAttrs.location).value).toEqual({
      location: {
        latitude: [
          {
            text: 'Число должно быть в диапозоне от {{min}} до {{max}}',
            hint: {
              max: 90,
              min: -90,
            },
            name: 'RangeNumberValidationRule',
          },
        ],
      },
    });
    // eslint-disable-next-line max-len
    expect(workshopAttrsVMap.employeesRole.validate(workshopAttrs.employeesRole).value).toBeUndefined();
  });

  test('failure, coordinates entered incorrectly, maximum value longitude 180 degrees', () => {
    const workshopAttrs: WorkshopAttrs = {
      workshopId: '6f91d305-3f4b-4a3d-9bef-72cf3757cc33',
      name: 'Nurbolat',
      city: 'Germany',
      address: 'Gerti-Bruns-Weg 4/7 70279 Freital',
      location: { latitude: 81.958285, longitude: 370.84182 },
      employeesRole: { userIds: ['fb8a83cf-25a3-2b4f-86e1-27f6de6d8374'] },
    };
    expect(workshopAttrsVMap.workshopId.validate(workshopAttrs.workshopId).value).toBeUndefined();
    expect(workshopAttrsVMap.name.validate(workshopAttrs.name).value).toBeUndefined();
    expect(workshopAttrsVMap.city.validate(workshopAttrs.city).value).toBeUndefined();
    expect(workshopAttrsVMap.address.validate(workshopAttrs.address).value).toBeUndefined();
    expect(workshopAttrsVMap.location.validate(workshopAttrs.location).value).toEqual({
      location: {
        longitude: [
          {
            text: 'Число должно быть в диапозоне от {{min}} до {{max}}',
            hint: {
              max: 180,
              min: -180,
            },
            name: 'RangeNumberValidationRule',
          },
        ],
      },
    });
    // eslint-disable-next-line max-len
    expect(workshopAttrsVMap.employeesRole.validate(workshopAttrs.employeesRole).value).toBeUndefined();
  });
});
