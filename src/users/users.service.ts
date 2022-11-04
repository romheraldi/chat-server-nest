import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User, UserQueryMany, UserQueryOne } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}
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
        query = query || {}
        query.where = { ...query?.where }
        return await this.repository.find(query)
    }

    async findOneOrFail(query?: UserQueryOne) {
        query = query || {}
        query.where = { ...query?.where }
        return await this.repository.findOneOrFail(query)
    }
}
