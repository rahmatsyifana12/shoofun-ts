import { Router } from 'express';
import { newUserSchema } from '../validations/user.validation';

import controller from '../controllers/user.controller';
import validateHandler from '../middlewares/validate.middleware';

const router = Router();

router.post('/login', controller.loginUser);
router.post('/register', validateHandler(newUserSchema), controller.addUser);

export default router;