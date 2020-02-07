import Note from '../models/Note';
import serverResponse from '../modules/serverResponse';

const { successResponse, serverErrorResponse, errorResponse } = serverResponse;

class NoteController {
  static async addNote(req, res) {
    const {
      title,
      body,
      latitude,
      longitude,
      street,
      city,
      country,
      idempotencyKey,
    } = req.body;
    const userId = req.user.id;
    try {
      const doesNoteExist = await Note.findOne({ idempotencyKey }, 'userId title body geoTag createdAt');
      if (!doesNoteExist) {
        const takeNote = new Note({
          userId,
          title,
          body,
          'geoTag.latitude': latitude,
          'geoTag.longitude': longitude,
          'geoTag.street': street,
          'geoTag.city': city,
          'geoTag.country': country,
          idempotencyKey,
        });
        const note = await takeNote.save();
        return successResponse(res, 201, 'note', {
          message: 'Note Added!',
          id: note.id,
          userId: note.userId,
          title: note.title,
          body: note.body,
          geoTag: note.geoTag,
          createdAt: note.createdAt,
        });
      } if (req.user.id === (doesNoteExist.userId).toString()) {
        return successResponse(res, 200, 'note', doesNoteExist);
      }
      return errorResponse(res, 400, { message: 'IdempotencyKey expired, please generate a new one' });
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }

  static async getNote(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    try {
      const checkNote = await Note.findOne({ userId, _id: id }, 'userId title body geoTag createdAt');
      if (!checkNote) {
        return errorResponse(res, 404, { message: 'Note not found' });
      }
      return successResponse(res, 200, 'note', checkNote);
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }

  static async getAllNotes(req, res) {
    const userId = req.user.id;
    try {
      const checkNotes = await Note.find({ userId }, 'userId title body geoTag createdAt');
      return successResponse(res, 200, 'notes', checkNotes, checkNotes);
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }

  static async editNote(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, body } = req.body;
    try {
      const checkNote = await Note.findOne({ userId, _id: id });
      if (!checkNote) {
        return errorResponse(res, 404, { message: 'Note not found' });
      }
      const updateNote = await Note.findOneAndUpdate(
        { userId, _id: id },
        { $set: { title, body, updatedAt: new Date() } },
        { new: true },
      );
      return successResponse(res, 200, 'note', {
        message: 'Changes saved!',
        id: updateNote.id,
        userId: updateNote.userId,
        title: updateNote.title,
        body: updateNote.body,
        geoTag: updateNote.geoTag,
        createdAt: updateNote.createdAt,
        updatedAt: updateNote.updatedAt,
      });
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }

  static async deleteNote(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    try {
      const checkNote = await Note.findOne({ userId, _id: id });
      if (!checkNote) {
        return errorResponse(res, 404, { message: 'Note not found' });
      }
      await Note.deleteOne({ userId, _id: id });
      return successResponse(res, 200, 'note', { message: 'Note deleted!' });
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }

  static async selectAndDeleteNotes(req, res) {
    const userId = req.user.id;
    const noteIds = req.body.id;
    try {
      await Note.deleteMany({ userId, _id: noteIds });
      return successResponse(res, 200, 'note', { message: 'Selected Note(s) deleted!' });
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }
}

export default NoteController;
