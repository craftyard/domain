import { describe, expect, test } from 'bun:test';
import { UserAttrs, UserProfile } from './params';
import { userAttrsVMap, userprofileVMap } from './v-map';

describe('all tested', () => {
  describe('test userProfile', () => {
    test('succes, there are no prohibited characters in the name and it does not exceed the limits', () => {
      const userProfile: UserProfile = { name: 'Nurbolat' };
      const vResult = userprofileVMap.name.validate(userProfile.name);
      expect(vResult.isSuccess()).toEqual(true);
      expect(vResult.value).toBeUndefined();
    });
    test('succes, there are no prohibited characters in the name and it does not exceed the limits', () => {
      const userProfile: UserProfile = { name: 'Нурболат' };
      const vResult = userprofileVMap.name.validate(userProfile.name);
      expect(vResult.isSuccess()).toEqual(true);
      expect(vResult.value).toBeUndefined();
    });
    test('succes, there are no prohibited characters in the name and it does not exceed the limits', () => {
      const userProfile: UserProfile = { name: 'Nurbolat-Amangaliyev' };
      const vResult = userprofileVMap.name.validate(userProfile.name);
      expect(vResult.isSuccess()).toEqual(true);
      expect(vResult.value).toBeUndefined();
    });
    test('failure, string length greater than 50', () => {
      const userProfile: UserProfile = { name: 'Nurbolaaaaaaaaaaaaat-Amangaliyevvvvvvvvvvvvvvvvvvvvvvvvvv' };
      const vResult = userprofileVMap.name.validate(userProfile.name);
      expect(vResult.isFailure()).toEqual(true);
      expect(vResult.value).toEqual({
        name: [
          {
            text: 'Длина строки должна быть меньше или равно {{maxCount}}',
            hint: { maxCount: 50 },
          },
        ],
      });
    });
    test('failure, A line cannot contain two languages at the same time', () => {
      const userProfile: UserProfile = { name: 'Nurbolat-Амангалиев' };
      const vResult = userprofileVMap.name.validate(userProfile.name);
      expect(vResult.isFailure()).toEqual(true);
      expect(vResult.value).toEqual({
        name: [
          {
            text: 'Строка не должна содержать символы кроме "-"(дефис) и может содержать слова только на латинице или на кирилице.',
            hint: {},
          },
        ],
      });
    });
    test('failure, There cannot be extra characters in the line', () => {
      const userProfile: UserProfile = { name: 'English$#%@' };
      const vResult = userprofileVMap.name.validate(userProfile.name);
      expect(vResult.isFailure()).toEqual(true);
      expect(vResult.value).toEqual({
        name: [
          {
            text: 'Строка не должна содержать символы кроме "-"(дефис) и может содержать слова только на латинице или на кирилице.',
            hint: {},
          },
        ],
      });
    });
  });

  describe('test userAttrs', () => {
    test('succes, all values are valid', () => {
      const userAttrs: UserAttrs = {
        userId: '68ae48f2-5ae8-4191-8bc5-93c21a4a35b3',
        telegramId: 1234567891011212,
        employeeId: '75bf9744-201a-4747-96d8-a3f4d0291b43',
        userProfile: {
          name: 'Nurbolat',
        },
      };
      expect(userAttrsVMap.userId.validate(userAttrs.userId).value).toBeUndefined();
      expect(userAttrsVMap.employeeId.validate(userAttrs.employeeId).value).toBeUndefined();
      expect(userAttrsVMap.telegramId.validate(userAttrs.telegramId).value).toBeUndefined();
      expect(userAttrsVMap.userProfile.validate(userAttrs.userProfile).value).toBeUndefined();
    });

    test('failure, userId value does not match UUID format', () => {
      const userAttrs: UserAttrs = {
        userId: '68ae48f2d443275463b3',
        telegramId: 123456789,
        employeeId: '75bf9744-201a-4747-96d8-a3f4d0291b43',
        userProfile: {
          name: 'Nurbolat',
        },
      };
      expect(userAttrsVMap.userId.validate(userAttrs.userId).value).toEqual({
        userId: [{
          text: 'Значение должно соответствовать формату UUID',
          hint: {},
        },
        ],
      });
      expect(userAttrsVMap.employeeId.validate(userAttrs.employeeId).value).toBeUndefined();
      expect(userAttrsVMap.telegramId.validate(userAttrs.telegramId).value).toBeUndefined();
      expect(userAttrsVMap.userProfile.validate(userAttrs.userProfile).value).toBeUndefined();
    });

    test('failure, telegram can only contain positive numbers', () => {
      const userAttrs: UserAttrs = {
        userId: '68ae48f2-5ae8-4191-8bc5-93c21a4a35b3',
        telegramId: -123456789,
        employeeId: '75bf9744-201a-4747-96d8-a3f4d0291b43',
        userProfile: {
          name: 'Nurbolat',
        },
      };
      expect(userAttrsVMap.userId.validate(userAttrs.userId).value).toBeUndefined();
      expect(userAttrsVMap.telegramId.validate(userAttrs.telegramId).value).toEqual({
        telegramId: [
          {
            text: 'Число должно быть положительным',
            hint: {},
          },
        ],
      });
      expect(userAttrsVMap.employeeId.validate(userAttrs.employeeId).value).toBeUndefined();
      expect(userAttrsVMap.userProfile.validate(userAttrs.userProfile).value).toBeUndefined();
    });

    test('failure, employeeId value does not match UUID format', () => {
      const userAttrs: UserAttrs = {
        userId: '68ae48f2-5ae8-4191-8bc5-93c21a4a35b3',
        telegramId: 123456789,
        employeeId: '75bf97a3f4d0291b43',
        userProfile: {
          name: 'Nurbolat',
        },
      };
      expect(userAttrsVMap.userId.validate(userAttrs.userId).value).toBeUndefined();
      expect(userAttrsVMap.telegramId.validate(userAttrs.telegramId).value).toBeUndefined();
      expect(userAttrsVMap.employeeId.validate(userAttrs.employeeId).value).toEqual({
        employeeId: [
          {
            text: 'Значение должно соответствовать формату UUID',
            hint: {},
          },
        ],
      });
      expect(userAttrsVMap.userProfile.validate(userAttrs.userProfile).value).toBeUndefined();
    });

    test('failure, the name in the user profile has a symbolic violation', () => {
      const userAttrs: UserAttrs = {
        userId: '68ae48f2-5ae8-4191-8bc5-93c21a4a35b3',
        telegramId: 1234568910,
        employeeId: '75bf9744-201a-4747-96d8-a3f4d0291b43',
        userProfile: {
          name: 'Nurbolat";%',
        },
      };
      expect(userAttrsVMap.userId.validate(userAttrs.userId).value).toBeUndefined();
      expect(userAttrsVMap.telegramId.validate(userAttrs.telegramId).value).toBeUndefined();
      expect(userAttrsVMap.employeeId.validate(userAttrs.employeeId).value).toBeUndefined();
      expect(userAttrsVMap.userProfile.validate(userAttrs.userProfile).value).toEqual({
        userProfile: {
          name: [
            {
              text: 'Строка не должна содержать символы кроме "-"(дефис) и может содержать слова только на латинице или на кирилице.',
              hint: {},
            },
          ],
        },
      });
    });

    test('failure, user profile name has string length violation', () => {
      const userAttrs: UserAttrs = {
        userId: '68ae48f2-5ae8-4191-8bc5-93c21a4a35b3',
        telegramId: 1234568910,
        employeeId: '75bf9744-201a-4747-96d8-a3f4d0291b43',
        userProfile: {
          name: 'Nurbolat-Solooooooooooong-name-i-think-its-sooooooo-looooooong',
        },
      };
      expect(userAttrsVMap.userId.validate(userAttrs.userId).value).toBeUndefined();
      expect(userAttrsVMap.telegramId.validate(userAttrs.telegramId).value).toBeUndefined();
      expect(userAttrsVMap.employeeId.validate(userAttrs.employeeId).value).toBeUndefined();
      expect(userAttrsVMap.userProfile.validate(userAttrs.userProfile).value).toEqual({
        userProfile: {
          name: [
            {
              text: 'Длина строки должна быть меньше или равно {{maxCount}}',
              hint: {
                maxCount: 50,
              },
            },
          ],
        },
      });
    });

    test('failure, user profile name has string length violation', () => {
      const userAttrs: UserAttrs = {
        userId: '68ae48f2-5ae8-4191-8bc5-93c21a4a35b3',
        telegramId: 1234568910,
        employeeId: undefined,
        userProfile: {
          name: 'Nurbolat',
        },
      };
      expect(userAttrsVMap.userId.validate(userAttrs.userId).value).toBeUndefined();
      expect(userAttrsVMap.telegramId.validate(userAttrs.telegramId).value).toBeUndefined();
      expect(userAttrsVMap.employeeId.validate(userAttrs.employeeId).value).toBeUndefined();
      expect(userAttrsVMap.userProfile.validate(userAttrs.userProfile).value).toBeUndefined();
    });
  });
});
