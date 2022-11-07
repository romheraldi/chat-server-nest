import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { Message, MessageQueryMany, MessageQueryOne } from "./entities/message.entity";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
    constructor(@InjectRepository(Message) private repository: Repository<Message>) {
    }

    async create(createMessageDto: CreateMessageDto) {
        const data = await this.repository.create(createMessageDto)

        return await this.repository.save(data)
    }

    async findAll(query?: MessageQueryMany) {
        return await this.repository.find(query)
    }

    async findOne(query?: MessageQueryOne) {
        return await this.repository.findOne(query)
    }
}
