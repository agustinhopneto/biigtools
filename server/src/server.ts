/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';

import routes from './routes';

import './config/dotenv';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.API_PORT, () => {
  console.log(
    `🚀 Server is running on ${process.env.API_URL}:${process.env.API_PORT}`,
  );
});
