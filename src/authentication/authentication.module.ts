import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { SessionSerializer } from './session.serializer'

@Module({
    imports: [UsersModule, PassportModule.register({ session: true })],
    providers: [LocalStrategy, SessionSerializer],
})
export class AuthenticationModule {}
