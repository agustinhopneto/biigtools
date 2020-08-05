import knex from 'knex';

import '../config/dotenv';

const connection = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host: String(process.env.HOST),
    user: String(process.env.USER),
    password: String(process.env.PASSWORD),
    database: String(process.env.DATABASE),
  },
});

export default connection;
