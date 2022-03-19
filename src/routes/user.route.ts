import { Router } from 'express';
import { loginUserSchema, newUserSchema } from '../validations/user.validation';

import controller from '../controllers/users.controller';
import validateHandler from '../middlewares/validate.middleware';
import authHandler from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', validateHandler(loginUserSchema), controller.loginUser);
router.post('/register', validateHandler(newUserSchema), controller.addUser);
router.post('/refreshtoken', authHandler, controller.refreshAccessToken);

router.delete('logout', authHandler, controller.logoutUser);

export default router;