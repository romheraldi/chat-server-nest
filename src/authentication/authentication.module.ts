import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'

@Module({
    imports: [UsersModule, PassportModule],
    providers: [LocalStrategy],
})
export class AuthenticationModule {}
