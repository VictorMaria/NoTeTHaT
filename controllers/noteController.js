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
      const doesNoteExist = await Note.findOne({ idempotencyKey });
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
        return successResponse(res, 201, 'Note', {
          message: 'Note Added!',
          id: note.id,
          userId: note.userId,
          title: note.title,
          body: note.body,
          geoTag: note.geoTag,
          createdAt: note.createdAt,
        });
      }
      return successResponse(res, 200, 'Note', {
        message: 'Note Added!',
        id: doesNoteExist.id,
        userId: doesNoteExist.userId,
        title: doesNoteExist.title,
        body: doesNoteExist.body,
        geoTag: doesNoteExist.geoTag,
        createdAt: doesNoteExist.createdAt,
      });
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }

  static async getNote(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    try {
      const checkNote = await Note.findOne({ userId, _id: id });
      if (!checkNote) {
        return errorResponse(res, 404, { message: 'Note not found' });
      }
      return successResponse(res, 200, 'Note', {
        message: 'There you go!',
        id: checkNote.userId,
        userId: checkNote.userId,
        title: checkNote.title,
        body: checkNote.body,
        geoTag: checkNote.geoTag,
        createdAt: checkNote.createdAt,
        updatedAt: checkNote.updatedAt,
      });
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
      return successResponse(res, 200, 'Note', {
        message: 'Changes saved!',
        id: updateNote.userId,
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
}

export default NoteController;
