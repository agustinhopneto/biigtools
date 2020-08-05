import path from 'path';
import './src/config/dotenv';

module.exports = {
  client: 'pg',
  connection: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
};
