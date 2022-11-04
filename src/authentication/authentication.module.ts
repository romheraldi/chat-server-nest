import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { SessionSerializer } from './session.serializer'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [UsersModule, PassportModule],
    providers: [LocalStrategy, JwtStrategy, SessionSerializer],
})
export class AuthenticationModule {}
