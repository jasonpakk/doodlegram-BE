import { Router } from 'express';
import * as Template from '../controllers/template_controller';

const router = Router();

/// your routes will go here
router.route('/')
  .get(async (req, res) => {
    try {
      const result = await Template.getTemplates();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;
