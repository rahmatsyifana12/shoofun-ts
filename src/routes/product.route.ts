import { Router } from 'express';
import {
    newProductSchema,
    productIdSchema
} from '../validations/product.validation';

import * as controller from '../controllers/product.controller';
import validateHandler from '../middlewares/validate.middleware';

const router = Router();

router.get('/', controller.getAllProducts);
router.get('/:productId', controller.getProductById);

router.post('/add',
    validateHandler(newProductSchema),
    controller.addProduct);

router.delete('/delete/:productId',
    validateHandler(productIdSchema, true),
    controller.deleteProductById
);

export default router;