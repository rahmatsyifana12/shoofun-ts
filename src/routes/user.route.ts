import { Router } from 'express';
import { loginUserSchema, newUserSchema } from '../validations/user.validation';

import controller from '../controllers/users.controller';
import validateHandler from '../middlewares/validate.middleware';

const router = Router();

router.post('/login', validateHandler(loginUserSchema), controller.loginUser);
router.post('/register', validateHandler(newUserSchema), controller.addUser);

export default router;