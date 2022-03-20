import { Router } from 'express';

import * as controller from '../controllers/cart.controller';
import authHandler from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authHandler, controller.getAllProductsInCart);

router.post('/add/:productId', authHandler, controller.addProductToCart);

export default router;