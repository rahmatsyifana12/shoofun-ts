import {
    BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Cart } from './carts/cart.entity';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 256 })
    email!: string;

    @Column({ length: 256 })
    password!: string;

    @Column({ name: 'display_name', length: 256 })
    displayName!: string;

    @Column({ length: 256 })
    address!: string;

    @Column({ name: 'phone_number', length: 256 })
    phoneNumber!: string;

    @OneToMany(() => Cart, (cart) => cart.user)
    carts!: Cart[];
}