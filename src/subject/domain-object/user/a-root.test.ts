import crypto from 'crypto';
import { describe, expect, test } from 'bun:test';
import { UserAR } from './a-root';

describe('UserAR', () => {
  test('should generate JWT token for valid authentication data', () => {
    const authQuery = {
      telegramAuthDto: {
        auth_date: 1699003283,
        first_name: 'Дамир',
        hash:
          'cae82c7775f8f95db80c5a9c7b224ef15f2d0cedb91649a31d08b30f1360225d',
        id: 694528239,
        photo_url:
          'https://t.me/i/userpic/320/GM3EKjh6x82Lo7cU3aGhVnmBC0BbE5uqOUIR5Ze_8bk.jpg',
        username: 'xhetso',
      },
      botToken: '6698548206:AAHF49aVG7c-QkIbHQb-OBGwgkYdBRSmTCo',
      privateKey: 'sadsadasasdsad',
      userAttrs: {
        userId: 'd462f0c6-25c4-45a3-bcf5-7d25d2a9a8df',
        telegramId: 694528239,
        userProfile: {
          name: 'Damir',
        },
      },
    };

    // Create an array with key-value pairs from telegramAuthDto
    const data_check_arr = Object.entries(authQuery.telegramAuthDto)
      .filter(([key]) => key !== 'hash')
      .map(([key, value]) => `${key}=${value}`);

    // Sort the array alphabetically
    data_check_arr.sort();

    // Join the sorted array with a newline character
    const data_check_string = data_check_arr.join('\n');

    // Create the expected binary hash
    const expectedHash = crypto
      .createHmac('sha256', Buffer.from(authQuery.botToken, 'utf8'))
      .update(data_check_string)
      .digest();

    // Convert the binary hash to a hex string if needed
    const hexHash = expectedHash.toString('hex');

    expect(authQuery.telegramAuthDto.hash).toBe(hexHash);
  });
});
