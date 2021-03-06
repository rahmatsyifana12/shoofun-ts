import { Request, Response } from 'express';
import { sendResponse } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';

import Product from '../entities/product.entity';
import { newProductType } from '../validations/product.validation';

export async function addProduct(req: Request, res: Response) {
    const body = req.body as newProductType;
    const product = Product.create(body);

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

export async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await Product.find({ where: { isDeleted: false } });

        return sendResponse(res, {
            message: 'Found all products',
            data: {
                products: products.map((product) => product.toFilter())
            }
        });
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}

export async function getProductById(req: Request, res: Response) {
    const productId = parseInt(req.params.productId);

    try {
        const product = await Product.findOne(
            {
                where: {
                    id: productId,
                    isDeleted: false
                }
            }
        );

        if (!product) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Product not found'
            });
        }

        return sendResponse(res, {
            message: 'Product found',
            data: {
                product: product.toFilter()
            }
        });
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}

export async function deleteProductById(req: Request, res: Response) {
    const productId = parseInt(req.params.productId);

    try {
        const product = await Product.findOne(
            {
                where: {
                    id: productId,
                    isDeleted: false
                }
            }
        );

        if (!product) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Product not found'
            });
        }

        product.isDeleted = true;
        product.save();

        return sendResponse(res, {
            message: 'Product removed successfully'
        });
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}