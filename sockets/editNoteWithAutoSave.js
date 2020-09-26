import Note from '../models/Note';

const updateNote = (id, itemToUpdate, itemValue, socket) => {
  if (itemValue) {
    Note.findOneAndUpdate(
      { _id: id },
      { $set: { [itemToUpdate]: itemValue } },
      { new: true },
    ).then((doc) => {
      if (!doc) {
        console.log('This note has been deleted');
        socket.emit('failure', { message: 'Error Saving, note has probably been deleted' });
      } else {
        console.log(doc);
        socket.emit('success', { message: 'Saved' });
      }
    });
  }
};

const editNoteWithAutoSave = (io, socket) => {
  let id;
  socket.on('noteId', (noteId) => {
    id = noteId;
  });
  socket.on('noteTitle', (noteTitle) => {
    updateNote(id, 'title', noteTitle, socket);
  });
  socket.on('noteBody', (noteBody) => {
    updateNote(id, 'body', noteBody, socket);
  });
};

export default editNoteWithAutoSave;
