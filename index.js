import '@babel/polyfill';
import express from 'express';
import Debug from 'debug';
import cors from 'cors';
import connectDb from './config/db';

const debug = Debug('dev');

const app = express();
connectDb();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => debug(`NoTeTHaT! is jotting everything on Port ${PORT}`));
