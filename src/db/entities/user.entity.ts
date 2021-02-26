import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        type:'bigint',
        unsigned:true
    })
    id: number;

    @Column()
    name: string;

    @Column({
        unique:true
    })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}