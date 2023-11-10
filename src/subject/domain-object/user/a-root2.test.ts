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
      jwtTokenGeneratePrivateKey: `-----BEGIN ENCRYPTED PRIVATE KEY-----
      MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIqVX8qRF0PU4CAggA
      MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBC+F/KtDKFJW247o1sJJ4N3BIIE
      0Hj8VqOmnHem4dnvKTALr29KDePKghOo0dTrz5nUo/CBgLpJ6OzDCAHLeu7MOKr7
      jsfjyNHbU9hVunbdISsNIMMNRLocZ+rIH9/lfBE97f2p4izD9aOVP7xpf2JUeC4Q
      CP8Lt56NPUgfscukiAcN9nemoJa6UOZLWHUfCbNjNznsWl3Rk4gN3H5+mixOpiSo
      D0O0TPS1e1yCVZBytZx8PI0GCzZXvbIgip9LVi7KiDOvmsv7HokuwWEEkbdZIk2p
      PXyjv3izbVwV5cuwz0+8ist9zN7jlXqOoZopdIZc5z1vrM3TTI43nKNarL3fQ9Js
      JLdyQRt+KL93rVQuNtslSl+eq6drKjCVZDvVES4QdIYuZj+UgRaJo37jvJqD2iy5
      wXWpQBKtZ1Bv9bygE2C6C+1ljLf/qJue23dUfzDKdQlbgsGAUiMH9h755VmGFm0O
      sMwGcvaiOk1mNM0XPZdiGVv3+30uATE8mWNPHF74rtd1vqHVkBeryAu6AWMQa0bn
      O17xjwWMlBjvIgJbaum0eFQrn3BUUKMbWuAOiululwBfBoVXxfo+13SyXh0E+A3Z
      yAWasi4nbI+jGKw9WZxamtkjvnYmQ9Wixl3SaxmdsYT1UVxnQXsu3M3EnMBcJam2
      oAEUnlnIaxAodNogjsPkBq24VoTGiuCnbpREoc0oGcudav6GW8BL7p21defit1Zy
      oLLws5tMLDRTlUcCBBtF3r5gMaggj9zxARAPLJuPj0huNkworlWZYIoX+or8DfDu
      Z6Wv2HP+MVH+riaj+xIPkUFwhOUJZn/YdX0igOxtA27hVpvLDUizYQyHZ2BcM4d1
      S/DCwDL+neXQaGUqUd+yhm1BLW7xAKtc0IlFIguteAoOiR7nrY5nRjVaS5O4rNG/
      +DGRsNWGXO4HZl3D2QOqH+DoMs9JtYEhqh5+MvcwyOcxibzvEdDwA/2tZ/ZO0SRV
      yOi0yQnLRFIez8C2dQeuXvHkQ8A8YMIDVwAQ/ehbg8zM9mkHNUoquJg0qf1RTgR3
      TBlZ4W2P119WwNRy7mGjtMc7QpNf99VIOmovHDxxXWegQ8X6ecRqWeMB81TNyIH7
      YmFzY9cRr7neEY55Llq1GMnOot6bygk6ExLkvWANaNGk75wPZANLAQaSIMxtYoci
      1gYZuByF8JL4pmzEnrnvzx0i+sEfL7hipCnqM2kg13MraO8l66/UnjM3Yx1Qjm4x
      MrP+fAREv01FlQy4yfmb5Gscsm3s8rIqWiMly4f4HE3f2tmGxxM9dqrYRytrjAbF
      SfJnCm/XGNzXN/aqmFmKNcIz/i89ZIjVS3IC+TcA+2Z7bS47vk4viL4jbUuSjlgj
      J5HwPGC9GHgjGm2okED7hZjxA16tAoH4wmxekmQ+VjxAapdN1U8U/a0oMypcVaxQ
      smnSJFzv3KeV+zhtTNTuWDTaU05sQv7zuU2jhpDp51/Bd6KBoUAoCPyuYZNBRTAt
      xDYWTTRoKM3B5n1PvFdTIP8amUZIMYeOf8iCHkfMYAvlC3C+tAYQrevf/h2wwIEX
      RIJaPRU2+VuayS4gvGIuEHkKzim32hZTheqZxWo3iySWycF8btUE4BkMLWjVRmMd
      VH6nQyZpq9oQGpTdsZ/orHTjzirRRUMjlaVHpApZIG6S
      -----END ENCRYPTED PRIVATE KEY-----`,
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
