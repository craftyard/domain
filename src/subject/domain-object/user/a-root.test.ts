import { describe, expect, test } from 'bun:test';
import { UserAR } from './a-root';

describe('UserAR isValidUser method', () => {
  const user = new UserAR({
    userId: 'd462f0c6-25c4-45a3-bcf5-7d25d2a9a8df',
    telegramId: 694528239,
    userProfile: {
      name: 'Damir',
    },
  }, 0);
  const authQuery = {
    telegramAuthDto: {
      id: 694528239,
      hash: '24b95fcfe1b294643cdfdae068c2e5d643172a2b18ad9823812617187f3d68e4',
      auth_date: '1698656796',
      first_name: 'Дамир',
      username: 'xhetso',
      photo_url: 'https://t.me/i/userpic/320/GM3EKjh6x82Lo7cU3aGhVnmBC0BbE5uqOUIR5Ze_8bk.jpg',
    },
    botToken: '6698548206:AAHF49aVG7c-QkIbHQb-OBGwgkYdBRSmTCo',
    jwtTokenGeneratePrivateKey: 'dflgdflkgdflgdflkgdfklgjdfgdklgdf',
  };

  describe('UserAR test', () => {
    test('generateHash should match authQuery', () => {
      const generateHash = myLogin.checkValidData(authQuery);
      expect(generateHash).toBe(true);
    });

    test('user ar auth test', () => {
      const user = new UserAR({
        userId: 'd462f0c6-25c4-45a3-bcf5-7d25d2a9a8df',
        telegramId: 694528239,
        userProfile: {
          name: 'Damir',
        },
      }, 0);

      const userQuery = {
        telegramAuthDto: authQuery,
        botToken: TOKEN,
        jwtTokenGeneratePrivateKey: 'dflgdflkgdflgdflkgdfklgjdfgdklgdf',
      };

      const dateMock = spyOn(user, 'getNowDate').mockReturnValueOnce(
        new Date(Number(userQuery.telegramAuthDto.auth_date) + 5000),
      );

      const result = user.userAuthentification(userQuery);
      console.log(result);
      expect(dateMock).toHaveBeenCalledTimes(1);
      expect(result.isSuccess()).toBe(true);
      expect(result.value).toBe('token');
    });
  });
});
