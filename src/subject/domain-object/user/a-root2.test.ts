import {
  describe, expect, spyOn, test,
} from 'bun:test';
import { UserAR } from './a-root';

const TOKEN = '6698548206:AAHF49aVG7c-QkIbHQb-OBGwgkYdBRSmTCo';

const authQuery = {
  id: 694528239,
  auth_date: '1698656796',
  first_name: 'Дамир',
  username: 'xhetso',
  photo_url: 'https://t.me/i/userpic/320/GM3EKjh6x82Lo7cU3aGhVnmBC0BbE5uqOUIR5Ze_8bk.jpg',
  hash: '24b95fcfe1b294643cdfdae068c2e5d643172a2b18ad9823812617187f3d68e4',
};

describe('UserAR test', () => {
  test('user ar auth test', () => {
    const user = new UserAR({
      userId: 'd462f0c6-25c4-45a3-bcf5-7d25d2a9a8df',
      telegramId: 694528239,
      employerId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      userProfile: {
        name: 'Damir',
      },
    }, 0);

    const userQuery = {
      telegramAuthDto: authQuery,
      botToken: TOKEN,
      jwtTokenGeneratePrivateKey: 'test',
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
