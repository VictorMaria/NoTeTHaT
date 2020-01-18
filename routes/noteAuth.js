import express from 'express';
import NoteController from '../controllers/noteController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/noteValidation';

const { addNote } = NoteController;
const { verifyToken } = Authentication;

const router = express.Router();

router.post('/notes', verifyToken, validate.newNote, addNote);

export default router;
