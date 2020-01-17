import express from 'express';
import passport from 'passport';
import authController from '../controllers/authController';
import validate from '../middlewares/authValidation';
import checkUser from '../middlewares/checkUser';

const { signUp, signIn, googleAuth } = authController;

const router = express.Router();

router.post('/signup', validate.signUp, checkUser, signUp);
router.post('/signin', validate.signIn, signIn);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// Google redirect URI
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }), googleAuth);

export default router;
