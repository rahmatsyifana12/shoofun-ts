import { Request, Response } from 'express';
import { sendResponse } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';

import { Cart } from '../entities/carts/cart.entity';
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

    const { userId } = req.body.$auth;
    const user = await User.findOne({ where: { id: userId } });
    const cart = Cart.create({ user });
    const cartItem = CartItem.create(
        {
            product
        }
    );

    try {
        await Cart.save(cart);

        cartItem.cart = cart;

        await CartItem.save(cartItem);

        return sendResponse(res, {
            message: 'Successfully added product to cart'
        });
    } catch (error) {
        console.log(error);
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}

export async function getAllProductsInCart(req: Request, res: Response) {
    const { userId } = req.body.$auth;
    const status = false;

    try {
        const products = await Cart.createQueryBuilder('cart')
            .select('product.id', 'id')
            .addSelect('name')
            .addSelect('price')
            .addSelect('quantity')
            .innerJoin('cart.cartItems', 'cart_item')
            .innerJoin('cart_item.product', 'product')
            .where(
                `cart.user_id = :userId AND
                 product.is_deleted = :status`, { userId, status }
            )
            .getRawMany();

        return sendResponse(res, {
            message: 'Found all products in cart',
            data: {
                products
            }
        });
    } catch (error) {
        console.error(error);
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}