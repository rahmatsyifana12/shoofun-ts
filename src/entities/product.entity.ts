import {
    BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import CartItem from './carts/cart-item.entity';

@Entity({ name: 'products' })
export default class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 256 })
    name!: string;

    @Column()
    price!: number;

    @Column({ length: 256 })
    description!: string;

    @Column({ type: 'decimal', scale: 2 })
    weight!: number;

    @Column({ name: 'is_deleted', default: false })
    isDeleted!: boolean;

    @OneToMany(() => CartItem, (item) => item.cart)
    cartItems!: CartItem;

    toFilter() {
        const clone = { ...this } as Record<string, unknown>;
        delete clone.isDeleted;

        return clone;
    }
}