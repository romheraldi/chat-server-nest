import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { responseJson } from '../utils/responseJson'
import { LocalAuthGuard } from '../authentication/local-auth.guard'
import { AuthenticatedGuard } from '../authentication/authenticated.guard'

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

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return responseJson(req.user)
    }

    @Get()
    async findAll() {
        const data = await this.service.findAll()

        return responseJson(data)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('me')
    async checkMe(@Request() req) {
        return responseJson(req.user)
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.service.findOneOrFail({
            where: { id: +id },
        })

        return responseJson(data)
    }
}
