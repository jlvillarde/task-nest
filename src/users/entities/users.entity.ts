import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    user_id: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    firstname: string;

    @Column({ type: 'varchar', length: 100, nullable: false, })
    lastname: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    contact_number: string;

    @DeleteDateColumn()
    deleted_at: Date;
}
