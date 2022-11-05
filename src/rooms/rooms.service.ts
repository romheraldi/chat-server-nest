import { Injectable } from '@nestjs/common'
import { CreateRoomDto } from './dto/create-room.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from './entities/room.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private repository: Repository<Room>) {}
    async create(dto: CreateRoomDto) {
        const getRandomName = Buffer.from(new Date()).toString('base64')

        dto.name = getRandomName

        const data = this.repository.create(dto)

        return await this.repository.save(data)
    }
}
