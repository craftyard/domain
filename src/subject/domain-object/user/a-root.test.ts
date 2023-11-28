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
  jwtTokenGeneratePrivateKey: '-----BEGIN RSA PRIVATE KEY-----MIIBOgIBAAJBAI2NGWEeXhoJcF007rDpD3v8K68d7wso5lcGFQxffE9kf+IP6SI5WkEdaACuxAS0fNoHZBgQr+AI28PtQmS/1W0CAwEAAQJANqWTd7f2kky0kXc+8xN2w+Htp3SB9af7jPsvIxC1+Bv8LphWRLlG9Cp5zEblvGNYTJnwyIIeSTpW10O0f2UiQQIhAMrt/tci9kBlc1oNRkxud6RTeUU6XiTifkVuCIEkc5exAiEAspHauhmS78rVWb0L0zGm7Y09qCzc8K9H8r+0NdTwBH0CIGZ1DWMP2ucekcQYybKTX8LPBn6mfpv+4yQo7xBNGDOxAiEAo0+za5nyAS5O+zhi9S6mzQDsj78f/VtBAOiEhusM6/0CICdCjeXyJWs85tGMoVrOAA0KdCc9f/RrgSnfjQwcgyPx-----END RSA PRIVATE KEY-----',
  jwtTokenGeneratePublicKey: '-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI2NGWEeXhoJcF007rDpD3v8K68d7wso5lcGFQxffE9kf+IP6SI5WkEdaACuxAS0fNoHZBgQr+AI28PtQmS/1W0CAwEAAQ==\n-----END PUBLIC KEY-----',
};

describe('UserAR test', () => {
  test('Telegram DTO auth_date validity test', () => {
    const dateMock = spyOn(user, 'getNowDate').mockReturnValueOnce(
      new Date(Number(userQuery.telegramAuthDTO.auth_date) + 5000),
    );
    const result = user.userAuthentification(userQuery);
    expect(dateMock).toHaveBeenCalledTimes(1);
    expect(result.isSuccess()).toBe(true);
  });

  test('Telegram DTO auth_date error handling test', () => {
    const dateMock = spyOn(user, 'getNowDate').mockReturnValueOnce(
      new Date(Number(userQuery.telegramAuthDTO.auth_date) + 35000),
    );
    const result = user.userAuthentification(userQuery);
    expect(dateMock).toHaveBeenCalledTimes(2);
    expect(result.isFailure()).toBe(true);
    expect(result.value).toEqual({
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

  test('JWT Tokens Retrieval Success Test', () => {
    const dateMock = spyOn(user, 'getNowDate').mockReturnValueOnce(
      new Date(Number(userQuery.telegramAuthDTO.auth_date) + 5000),
    );
    const result = user.userAuthentification(userQuery);
    expect(dateMock).toHaveBeenCalledTimes(3);
    expect(result.isSuccess()).toBe(true);
    if ('accessToken' in result.value && 'refreshToken' in result.value) {
      expect(typeof result.value.accessToken).toBe('string');
      expect(typeof result.value.refreshToken).toBe('string');
    } else {
      expect(typeof result.value).not.toBe('object');
    }
  });
});
