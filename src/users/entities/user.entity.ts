import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    FindManyOptions,
    FindOneOptions,
    PrimaryGeneratedColumn
} from 'typeorm'
import * as bcrypt from 'bcryptjs'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    private encryptPassword() {
        if (this.password) {
            this.password = bcrypt.hashSync(this.password, 10)
        }
    }
}

export type UserQueryOne = FindOneOptions<User>
export type UserQueryMany = FindManyOptions<User>
