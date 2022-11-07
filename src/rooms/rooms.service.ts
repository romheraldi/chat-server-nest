import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRoomDto } from './dto/create-room.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Room, RoomManyQuery, RoomOneQuery } from './entities/room.entity'
import { Repository } from 'typeorm'
import { randomInt } from "crypto";

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private repository: Repository<Room>) {}
    async create(dto: CreateRoomDto) {
        dto.socket = Buffer.from(randomInt(111,222).toString()).toString('base64')

        const data = this.repository.create(dto)

        return await this.repository.save(data)
    }

    async findAll(query?: RoomManyQuery) {
        return this.repository.find(query)
    }

    async findOne(query?: RoomOneQuery) {
        return this.repository.findOne(query)
    }

    async findOneOrFail(query?: RoomOneQuery) {
        const data = await this.repository.findOne(query)
        if (!data) throw new NotFoundException('data not found')
        return data
    }
}
