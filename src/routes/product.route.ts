import { Router } from 'express';
import { newProductSchema } from '../validations/product.validation';

import controller from '../controllers/product.controller';
import validateHandler from '../middlewares/validate.middleware';

const router = Router();

router.post('add', validateHandler(newProductSchema), controller.addProduct);

export default router;