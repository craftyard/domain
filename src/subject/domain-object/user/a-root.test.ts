import { describe, expect, test } from 'bun:test';
import { TelegramLogin } from './a-root-test';

const TOKEN = '6698548206:AAHF49aVG7c-QkIbHQb-OBGwgkYdBRSmTCo';
const myLogin = new TelegramLogin(TOKEN);

const authQuery = {
  id: 694528239,
  auth_date: '1698656796',
  first_name: 'Дамир',
  username: 'xhetso',
  photo_url: 'https://t.me/i/userpic/320/GM3EKjh6x82Lo7cU3aGhVnmBC0BbE5uqOUIR5Ze_8bk.jpg',
  hash: '24b95fcfe1b294643cdfdae068c2e5d643172a2b18ad9823812617187f3d68e4',
};

describe('UserAR test', () => {
  test('generateHash should match authQuery', () => {
    const generateHash = myLogin.chechValidData(authQuery);
    expect(generateHash).toBe(authQuery);
  });
});
