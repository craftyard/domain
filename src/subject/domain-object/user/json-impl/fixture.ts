import { UserAttrs } from '../../../domain-data/user/params';

export const testUsers: UserAttrs[] = [
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

export const testUsersAsJson = JSON.stringify(testUsers);

export function getUserAttrs(attrs: Partial<UserAttrs>): string {
  return JSON.stringify([{ ...testUsers[2], ...attrs }]);
}
