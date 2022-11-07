import { Column, Entity, FindManyOptions, FindOneOptions, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Message } from "../../messages/entities/message.entity";

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    socket: string

    @Column()
    user_id: number

    @Column()
    another_user_id: number

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'another_user_id' })
    another_user: User

    @OneToMany(() => Message, message => message.room)
    messages: Message[]

}

export type RoomOneQuery = FindOneOptions<Room>
export type RoomManyQuery = FindManyOptions<Room>
