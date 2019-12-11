import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send('NoTeTHaT! is jotting everything live'));

export default router;
