import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "./task.entity";

@Entity('users')
export class User extends BaseEntity{
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
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Task, (task) => task.user, {eager:true})
    task: Task[]

    async validatePassword(password: string): Promise<boolean>{
        return await bcrypt.compare(password, this.password);
    }
}