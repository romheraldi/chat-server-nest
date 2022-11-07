import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { RoomsModule } from "../rooms/rooms.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'aqwer',
            signOptions: { expiresIn: '100d' },
        }),
        RoomsModule
    ],
    exports: [UsersService],
})
export class UsersModule {}
