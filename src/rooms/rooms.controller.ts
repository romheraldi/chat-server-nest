import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { CreateRoomDto } from './dto/create-room.dto'
import { responseJson } from 'src/utils/responseJson'

@Controller('rooms')
export class RoomsController {
    constructor(private readonly service: RoomsService) {}

    @Post()
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.service.create(createRoomDto)
    }

    @Get()
    findAll() {
        return this.service.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        console.log(id)
        const data = await this.service.findOneOrFail({
            where: { socket: id },
        })

        return responseJson(data)
    }
}
