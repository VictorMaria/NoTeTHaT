import { Router } from 'express';
import authRoute from './authRoute';
import noteRoute from './noteRoute';

const router = Router();

router.use('/auth', authRoute);
router.use('/', noteRoute);


export default router;
