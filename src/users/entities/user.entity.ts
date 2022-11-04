import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
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
