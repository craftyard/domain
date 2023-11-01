const authQuery = {
  telegramAuthDto: {
    id: 694528239,
    first_name: 'Дамир',
    last_name: 'Фамилия',
    username: 'xhetso',
    photo_url: 'https://t.me/i/userpic/320/GM3EKjh6x82Lo7cU3aGhVnmBC0BbE5uqOUIR5Ze_8bk.jpg',
    auth_date: 1698656796,
    hash: '24b95fcfe1b294643cdfdae068c2e5d643172a2b18ad9823812617187f3d68e4',
  },
  botToken: 'your-secret-token',
};

const computedHash = crypto
    .createHmac('sha256', authQuery.botToken)
    .update(`${id}${first_name}${Last_name}${username}${photo_url}${auth_date}`)
    .digest('hex');
