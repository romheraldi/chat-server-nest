import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { Socket, Server } from 'socket.io'
import { RoomsService } from '../rooms/rooms.service'
import { CreateRoomDto, FetchRoomsDto } from 'src/rooms/dto/create-room.dto'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class MessagesGateway {
    @WebSocketServer()
    server: Server

    constructor(private readonly messagesService: MessagesService, private readonly roomsService: RoomsService) {}

    @SubscribeMessage('createMessage')
    async create(@MessageBody() createMessageDto: CreateMessageDto) {
        const message = await this.messagesService.create(createMessageDto)

        console.log(message)
        const newMessage = await this.messagesService.findOne({where: {id: message.id}, relations: ['room', 'sender']})
        this.server.to(newMessage.room.socket).emit('message', newMessage)
        return message
    }

    @SubscribeMessage('createRoom')
    async createRoom(@MessageBody() createRoomDto: CreateRoomDto) {
        const room = await this.roomsService.create(createRoomDto)
        this.server
            .to([`member-${createRoomDto.another_user_id}`, `member-${createRoomDto.user_id}`])
            .emit('joinRoom', createRoomDto.socket)
        return room
    }

    @SubscribeMessage('fetchRooms')
    async fetchRooms(@MessageBody() fetchRoomDto: FetchRoomsDto, @ConnectedSocket() client: Socket) {
        const rooms = await this.roomsService.findAll({
            where: [
                {user_id: fetchRoomDto.id},
                {another_user_id: fetchRoomDto.id}
            ]
        })

        rooms.forEach(room => {
            client.join(room.socket)
        })
        return rooms
    }

    @SubscribeMessage('fetchRoomMessages')
    async findAll(@MessageBody() socket: string, @ConnectedSocket() client: Socket) {
        const room = await this.roomsService.findOne({where: {socket}})

        client.join(room.socket)

        const roomMessages = await this.messagesService.findAll(
                {where: {room: {id: room.id}}, relations: ['room', 'sender'], order: {created_at: -1}}
                )
        client.emit('roomMessages', roomMessages)

        return roomMessages
    }

    @SubscribeMessage('join')
    joinRoom(@MessageBody() socket: string, @ConnectedSocket() client: Socket) {
        client.join(socket)
    }
}
