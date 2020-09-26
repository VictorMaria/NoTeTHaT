/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import express from 'express';
import http from 'http';
import passport from 'passport';
import Debug from 'debug';
import cors from 'cors';
import connectDb from './config/db';
import routes from './routes';
import passportSetup from './helpers/strategies';
import socketConnection from './helpers/socketIo';

const ApiPrefix = '/api/v1';
const debug = Debug('dev');

const app = express();

const server = http.createServer(app);
socketConnection(server);

app.use(passport.initialize());
connectDb();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(ApiPrefix, routes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'NoTeTHaT! is jotting everything live' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => debug(`NoTeTHaT! is jotting everything on Port ${PORT}`));
