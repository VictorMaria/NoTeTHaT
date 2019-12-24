import express from 'express';
import authController from '../controllers/authController';
import validate from '../middlewares/authValidation';
import checkUser from '../middlewares/checkUser';

const { signUp, signIn } = authController;

const router = express.Router();

router.post('/signup', validate.signUp, checkUser, signUp);
router.post('/signin', validate.signIn, signIn);

export default router;
