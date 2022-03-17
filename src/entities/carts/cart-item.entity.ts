import {
    Entity, BaseEntity, JoinColumn, Column, ManyToOne
} from 'typeorm';

import Cart from './cart.entity';
import Product from '../product.entity';

@Entity({ name: 'cart_items' })
export default class CartItem extends BaseEntity {
    @ManyToOne(
        () => Cart,
        (cart) => cart.cartItems
    )
    @JoinColumn({ name: 'cart_id' })
    cart!: Cart;

    @ManyToOne(
        () => Product,
        (product) => product.cartItems
    )
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({ type: 'integer', default: 1 })
    quantity!: number;
}