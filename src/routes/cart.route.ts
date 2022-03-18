import { Router } from 'express';

import * as controller from '../controllers/carts.controller';
import authHandler from '../middlewares/auth.middleware';

const router = Router();

router.post('/add/:productId', authHandler, controller.addProductToCart);

export default router;