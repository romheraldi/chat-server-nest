import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { responseJson } from '../utils/responseJson'

@Controller({
    path: 'users',
})
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: CreateUserDto) {
        const data = await this.service.create(dto)
        return responseJson(data, HttpStatus.CREATED, 'User created successfully')
    }

    @Get()
    async findAll() {
        const data = await this.service.findAll()

        return responseJson(data)
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.service.findOneOrFail({
            where: { id: +id },
        })

        return responseJson(data)
    }
}
