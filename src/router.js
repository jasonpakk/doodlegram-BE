import { Router } from 'express';

// import controllers here
import * as Template from './controllers/template_controller';
import * as UserController from './controllers/user_controller';
import { requireSignin } from './services/passport';
// import { requireAuth, requireSignin } from './services/passport';

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

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({ token, email: req.user.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

export default router;
