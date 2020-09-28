import socketIo from 'socket.io';
import Debug from 'debug';
import editNoteWithAutoSave from './editNoteWithAutoSave';
import captureRayFromPC from './ray';

const debug = Debug('dev');


const socketConnection = (server) => {
  const io = socketIo(server);
  io.on('connection', (socket) => {
    debug('The NoTeTHat sockets are 5 Alive');
    socket.emit('greetings', { message: 'Welcome to NoTeTHaT' });
    editNoteWithAutoSave(socket);
    captureRayFromPC(socket);
  });
};

export default socketConnection;
