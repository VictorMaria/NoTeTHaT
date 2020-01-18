import Note from '../models/Note';
import serverResponse from '../modules/serverResponse';

const { successResponse, serverErrorResponse } = serverResponse;

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
    const { id } = req.user;
    try {
      const doesNoteExist = await Note.findOne({ idempotencyKey });
      if (!doesNoteExist) {
        const takeNote = new Note({
          userId: id,
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
          id: note.userId,
          userId: note.userId,
          title: note.title,
          body: note.body,
          geoTag: note.geoTag,
        });
      }
      return successResponse(res, 200, 'Note', {
        message: 'Note Added!',
        id: doesNoteExist.userId,
        userId: doesNoteExist.userId,
        title: doesNoteExist.title,
        body: doesNoteExist.body,
        geoTag: doesNoteExist.geoTag,
      });
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }
}

export default NoteController;
