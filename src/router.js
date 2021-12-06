import { Router } from 'express';

// import controllers here
import * as Template from './controllers/template_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our template api!' });
});

/// your routes will go here
const handleGetPosts = async (req, res) => {
  try {
    const result = await Template.getTemplates();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

router.route('/posts')
  .get(handleGetPosts);

export default router;
