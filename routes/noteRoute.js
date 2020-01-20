import express from 'express';
import NoteController from '../controllers/noteController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/noteValidation';

const { addNote, editNote, getNote } = NoteController;
const { verifyToken } = Authentication;

const router = express.Router();

router.post('/notes', verifyToken, validate.newNote, addNote);
router.get('/notes/:id', verifyToken, validate.validateId, getNote);
router.patch('/notes/:id', verifyToken, validate.validateId, validate.editNote, editNote);

export default router;
