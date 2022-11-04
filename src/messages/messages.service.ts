import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { Message } from './entities/message.entity'

@Injectable()
export class MessagesService {
    messages: Message[] = [{ name: 'Romheraldi', message: 'halooo' }]

    create(createMessageDto: CreateMessageDto) {
        const message = { ...createMessageDto }
        this.messages.push(message)

        return message
    }

    findAll() {
        return this.messages
    }
}
