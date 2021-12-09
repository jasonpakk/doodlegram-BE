import { Router } from 'express';
import signS3 from '../services/s3';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our template api!' });
});

router.get('/sign-s3', signS3);

export default router;
