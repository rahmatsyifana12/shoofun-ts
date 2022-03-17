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

    @Column({ type: 'decimal', scale: 2 })
    weight!: number;

    @Column({ name: 'is_deleted', default: false })
    isDeleted!: boolean;

    toFilter() {
        const clone = { ...this } as Record<string, unknown>;
        delete clone.isDeleted;

        return clone;
    }
}