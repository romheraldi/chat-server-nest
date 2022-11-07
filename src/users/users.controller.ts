import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Request,
  Res,
  BadRequestException
} from "@nestjs/common";
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { responseJson } from '../utils/responseJson'
import { LocalAuthGuard } from '../authentication/local-auth.guard'
import { JwtAuthGuard } from '../authentication/jwt-auth.guard'
import * as cookie from 'cookie'
import { RoomsService } from "../rooms/rooms.service";

@Controller({
    path: 'users',
})
export class UsersController {
    constructor(private readonly service: UsersService, private readonly roomsService: RoomsService) {}

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
                maxAge: 365000000,
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
        return responseJson(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-rooms')
    async myRooms(@Request() req) {
        const rooms = await this.roomsService.findAll({
            where: [
                {user_id: req.user.id},
                {another_user_id: req.user.id}
            ],
            relations: ['user', 'another_user']
        })
        return responseJson(rooms)
    }

    @UseGuards(JwtAuthGuard)
    @Get('username/:username')
    async getUsername(@Param('username') username: string, @Request() req) {
        const user = await this.service.findOneOrFail({
            where: {username},
        })

        const rooms = await this.roomsService.findAll({
            where: [
                {user_id: req.user.id, another_user_id: user.id},
                {user_id: user.id, another_user_id: req.user.id}
            ]
        })

        if (rooms.length > 0) {
            throw new BadRequestException("Room sudah terbentuk sebelumnya")
        }
        return responseJson(user)
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.service.findOneOrFail({
            where: { id: +id },
        })

        return responseJson(data)
    }
}
