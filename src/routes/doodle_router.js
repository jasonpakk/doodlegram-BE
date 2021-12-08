import { Router } from 'express';
import * as Doodles from '../controllers/doodle_controller';

const router = Router();

router.route('/')
  .post(async (req, res) => {
    try {
      const result = await Doodles.createDoodle(req.body, req.user);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    try {
      const result = await Doodles.getDoodles();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const result = await Doodles.getDoodle(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await Doodles.deleteDoodle(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .put(async (req, res) => {
    try {
      const result = await Doodles.updateDoodle(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;
