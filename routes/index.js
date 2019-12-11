import { Router } from 'express';
import home from './home';
import authRoute from './authRoute';

const router = Router();

router.use('/', home);
router.use('/auth', authRoute);

export default router;
