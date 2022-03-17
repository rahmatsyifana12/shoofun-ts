import { Router } from 'express';
import { newProductSchema } from '../validations/product.validation';

import controller from '../controllers/product.controller';
import validateHandler from '../middlewares/validate.middleware';

const router = Router();

router.get('/', controller.getAllProducts);

router.post('/add', validateHandler(newProductSchema), controller.addProduct);

export default router;