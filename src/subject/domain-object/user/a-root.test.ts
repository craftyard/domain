import {
  describe, expect, spyOn, test,
} from 'bun:test';
import { JWTTokens } from 'rilata2/src/app/jwt/types';
import { TokenCreator } from 'rilata2/src/app/jwt/token-creator.interface';
import { UserAR } from './a-root';
import { JWTPayload } from '../../domain-data/user/user-authentification/a-params';

const TOKEN = '6698548206:AAHF49aVG7c-QkIbHQb-OBGwgkYdBRSmTCo';

const authQuery = {
  id: 694528239,
  auth_date: '1698656796',
  first_name: 'Дамир',
  username: 'xhetso',
  photo_url: 'https://t.me/i/userpic/320/GM3EKjh6x82Lo7cU3aGhVnmBC0BbE5uqOUIR5Ze_8bk.jpg',
  hash: '24b95fcfe1b294643cdfdae068c2e5d643172a2b18ad9823812617187f3d68e4',
};
const authQueryNotValid = {
  id: 694528239,
  auth_date: '1698656796',
  first_name: 'Дамир',
  username: 'xhetso',
  photo_url: 'https://t.me/i/userpic/320/GM3EKjh6x82Lo7cU3aGhVnmBC0BbE5uqOUIR5Ze_8bk.jpg',
  hash: '24b95fcfe1b294643cdfdae068c2e5d643172a2b18ad9823812617187f3d68e4H',
};
const user = new UserAR({
  userId: 'd462f0c6-25c4-45a3-bcf5-7d25d2a9a8df',
  telegramId: 694528239,
  employeeId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  userProfile: {
    name: 'Damir',
  },
}, 0);

const userQuery = {
  telegramAuthDTO: authQuery,
  botToken: TOKEN,
};
const userQuery2 = {
  telegramAuthDTO: authQueryNotValid,
  botToken: TOKEN,
};

class TokenCreatorMock implements TokenCreator<JWTPayload> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createToken(payload: JWTPayload): JWTTokens {
    throw new Error('Method not implemented.');
  }
}

describe('UserAR test', () => {
  test('Проверяем на успешное возвращение токенов и типы токенов', () => {
    const dateMock = spyOn(user, 'getNowDate').mockReturnValueOnce(
      new Date(Number(userQuery.telegramAuthDTO.auth_date) + 5000),
    );

    const tokenCreatorMock = new TokenCreatorMock();
    const createTokenMock = spyOn(tokenCreatorMock, 'createToken').mockReturnValueOnce({
      accessToken: 'anklehfkahlgrhaiyr7ihfkjashrlgk',
      refreshToken: 'afauhslfuhalskdfhauefglkasdfg',
    });

    const result = user.userAuthentification(userQuery, tokenCreatorMock);
    expect(dateMock).toHaveBeenCalledTimes(1);
    expect(createTokenMock).toHaveBeenCalledTimes(1);
    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual({
      accessToken: 'anklehfkahlgrhaiyr7ihfkjashrlgk',
      refreshToken: 'afauhslfuhalskdfhauefglkasdfg',
    });
  });

  test('Проверяем на ошибку времени приходящего хэша при авторизации', () => {
    const tokenCreatorMock = new TokenCreatorMock();
    const result = user.userAuthentification(userQuery, tokenCreatorMock);
    expect(result.isFailure()).toBe(true);
    expect(result.value).toStrictEqual({
      name: 'TelegramAuthDateNotValidError',
      locale: {
        text: 'Прошло больше {{authHashLifetimeAsSeconds}} секунд после получения кода авторизации в телеграм. Повторите процедуру авторизации еще раз.',
        hint: {
          authHashLifetimeAsSeconds: 30,
        },
      },
      errorType: 'domain-error',
      domainType: 'error',
    });
  });
  test('Проверяем на ошибку хэша при авторизации', () => {
    const tokenCreatorMock = new TokenCreatorMock();
    const result = user.userAuthentification(userQuery2, tokenCreatorMock);
    expect(result.isFailure()).toBe(true);
    expect(result.value).toStrictEqual({
      name: 'TelegramHashNotValidError',
      locale: {
        text: 'Хэш телеграмма некорректный',
        hint: {
          hash: '24b95fcfe1b294643cdfdae068c2e5d643172a2b18ad9823812617187f3d68e4H',
        },
      },
      errorType: 'domain-error',
      domainType: 'error',
    });
  });
});
