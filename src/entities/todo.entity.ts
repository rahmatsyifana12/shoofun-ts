import { DateTime } from 'luxon';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn,
    ValueTransformer
} from 'typeorm';

const dateTransformer: ValueTransformer = {
    from: (date: Date) => DateTime.fromJSDate(date),
    to: (date: DateTime) => date.toJSDate()
};

@Entity({ name: 'todos' })
export default class Todo extends BaseEntity {

    static readonly DATE_FORMAT = 'dd-MM-yyyy HH:mm:ss';

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 256 })
    message!: string;

    @Column({
        type: 'timestamp',
        transformer: dateTransformer
    })
    createdAt!: DateTime;

    toJSON(): Record<string, unknown> {
        return {
            id: this.id,
            message: this.message,
            createdAt: this.createdAt.toFormat(Todo.DATE_FORMAT)
        };
    }

}