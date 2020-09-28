import http from 'http';
import app from './app';
import Debug from 'debug';
import socketConnection from './sockets';

const debug = Debug('dev');

const server = http.createServer(app);
socketConnection(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => debug(`NoTeTHaT! is jotting everything on Port ${PORT}`));
