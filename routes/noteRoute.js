import express from 'express';
import NoteController from '../controllers/noteController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/noteValidation';
import validatorResponder from '../middlewares/validatorResponder';
import checkIds from '../middlewares/checkIds';

const {
  addNote,
  editNote,
  getNote,
  getAllNotes,
  deleteNote,
  selectAndDeleteNotes,
} = NoteController;
const { verifyToken } = Authentication;

const router = express.Router();

router.post('/notes', verifyToken, validate.newNote, validatorResponder, addNote);
router.get('/notes/:id', verifyToken, validate.validateId, validatorResponder, getNote);
router.get('/notes', verifyToken, getAllNotes);
router.patch('/notes/:id',
              verifyToken,
              validate.validateId,
              validatorResponder,
              validate.editNote,
              validatorResponder,
              editNote);
router.delete('/notes/selected', verifyToken, checkIds, selectAndDeleteNotes);
router.delete('/notes/:id',
              verifyToken,
              validate.validateId,
              validatorResponder,
              deleteNote);

export default router;
