import { User } from "../../users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  FindManyOptions,
  FindOneOptions,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Room } from "../../rooms/entities/room.entity";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    room_id: number

    @Column()
    message: string

    @Column()
    sender_id: number

    @ManyToOne(() => Room, room => room.id)
    @JoinColumn({name: 'room_id'})
    room: Room

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: 'sender_id'})
    sender: User

    @CreateDateColumn()
    created_at: Date
}

export type MessageQueryOne = FindOneOptions<Message>
export type MessageQueryMany = FindManyOptions<Message>