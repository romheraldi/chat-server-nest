import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private service: UsersService) {
        super()
    }

    async validate(username: string, password: string): Promise<User> {
        return this.service.authenticateUser(username, password)
    }
}
