import { Request, Response } from 'express';
import { sendResponse } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { Cart, CartStatus } from '../entities/carts/cart.entity';
import CartItem from '../entities/carts/cart-item.entity';
import Product from '../entities/product.entity';
import User from '../entities/user.entity';

export async function addProductToCart(req: Request, res: Response) {
    const productId = parseInt(req.params.productId);

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

    const authHeader = req.headers['authorization'];
    const token = authHeader!.split(' ')[1];
    const userId = (jwt.decode(token) as jwt.JwtPayload).userId;

    const user = await User.findOne({ where: { id: userId } });

    const cart = Cart.create({ user: user });
    const cartItem = CartItem.create(
        {
            cart: cart,
            product: product
        }
    );

    try {
        await Cart.save(cart);
        await CartItem.save(cartItem);

        return sendResponse(res, {
            message: 'Successfully added product to cart'
        });
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}