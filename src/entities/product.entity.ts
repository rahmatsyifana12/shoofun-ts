import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column()
    weight!: number;

    @Column()
    is_deleted!: boolean;
}