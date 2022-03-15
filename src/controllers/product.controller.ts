import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/api.util';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import Product from '../entities/product.entity';
import { newProductType } from '../validations/product.validation';

async function addProduct(req: Request, res: Response) {
    const body = req.body as newProductType;

    const product = Product.create({
        name: body.name,
        price: body.price,
        description: body.description,
        weight: body.weight
    });

    try {
        await product.save();
        return sendResponse(res, {
            message: 'Successfully added new product'
        });
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}

export default { addProduct };