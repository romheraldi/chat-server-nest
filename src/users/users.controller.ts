import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request, Res } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { responseJson } from '../utils/responseJson'
import { LocalAuthGuard } from '../authentication/local-auth.guard'
import { JwtAuthGuard } from '../authentication/jwt-auth.guard'
import * as cookie from 'cookie'

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
    async login(@Request() req, @Res({ passthrough: true }) res) {
        const accessToken = await this.service.login(req.user)

        const secretData = {
            token: accessToken.access_token,
            refreshToken: '',
        }

        // res.cookie('nekot', secretData, { httpOnly: true })
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('nekot', secretData.token, {
                httpOnly: true,
                sameSite: 'none',
                secure: false,
                maxAge: 3600,
            }),
        )
        return responseJson(accessToken)
    }

    @Get()
    async findAll() {
        const data = await this.service.findAll()

        return responseJson(data)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async checkMe(@Request() req) {
        console.log(req.headers)
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
