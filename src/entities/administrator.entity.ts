import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as Validator from 'class-validator';

@Entity("administrator")
export class Administrator {
    @PrimaryGeneratedColumn({ name: 'administrator_id', type: 'int', unsigned: true })
    administratorId: number;

    @Column({ type: 'varchar', length: '32', unique: true })
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[a-z][a-z0-9\-\.]{2,30}[a-z0-9]$/)
    username: string;

    @Column({ name: 'password_hash', type: 'varchar', length: '128' })
    @Validator.IsNotEmpty()
    @Validator.IsHash('sha512')
    passwordHash: string;
}