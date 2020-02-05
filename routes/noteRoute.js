import express from 'express';
import NoteController from '../controllers/noteController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/noteValidation';
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

router.post('/notes', verifyToken, validate.newNote, addNote);
router.get('/notes/:id', verifyToken, validate.validateId, getNote);
router.get('/notes', verifyToken, getAllNotes);
router.patch('/notes/:id', verifyToken, validate.validateId, validate.editNote, editNote);
router.delete('/notes/selected', verifyToken, checkIds, selectAndDeleteNotes);
router.delete('/notes/:id', verifyToken, validate.validateId, deleteNote);

export default router;
