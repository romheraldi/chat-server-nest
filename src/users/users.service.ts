import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User, UserQueryMany, UserQueryOne } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>, private jwtService: JwtService) {}
    async create(dto: CreateUserDto) {
        const usernameExist = await this.findOne({
            where: [{ username: dto.username }],
        })

        if (usernameExist) throw new BadRequestException('username already exists')

        const data = this.repository.create(dto)

        return await this.repository.save(data)
    }

    async findAll(query?: UserQueryMany) {
        return await this.repository.find(query)
    }

    async findOne(query?: UserQueryOne) {
        return await this.repository.findOne(query)
    }

    async findOneOrFail(query?: UserQueryOne) {
        const data = await this.repository.findOne(query)
        if (!data) throw new NotFoundException('data not found')
        return data
    }

    async authenticateUser(username: string, password: string) {
        const user = await this.findOneOrFail({ where: { username } })

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
        }

        return user
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
