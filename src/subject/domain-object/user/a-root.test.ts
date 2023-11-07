import * as crypto from 'crypto';
import { describe, expect, test } from 'bun:test';

describe('UserAR test', () => {
  test('should generate JWT token for valid authentication data', () => {
    const authQuery = {
      id: 694528239,
      auth_date: '1698656796',
      first_name: 'Дамир',
      username: 'xhetso',
      photo_url: 'https://t.me/i/userpic/320/GM3EKjh6x82Lo7cU3aGhVnmBC0BbE5uqOUIR5Ze_8bk.jpg',
    };
    const botToken = '';
    interface TelegramLoginPayload {
      id: number;
      auth_date: string;
      first_name?: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    }
    function verifyTelegramPayload(payload: TelegramLoginPayload) {
      const check = crypto.createHmac('sha256', botToken).update(
        Object
          .keys(payload)
          .map((key: string) => `${key}=${payload[key as keyof TelegramLoginPayload]}`)
          .sort()
          .join('\n'),
      ).digest('hex');
      return check;
    }

    const checkToken = verifyTelegramPayload(authQuery);

    const tgHash = '24b95fcfe1b294643cdfdae068c2e5d643172a2b18ad9823812617187f3d68e4';
    expect(tgHash).toBe(checkToken);
  });
});
