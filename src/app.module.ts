import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MessagesModule } from './messages/messages.module'
import { UsersModule } from './users/users.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { RoomsModule } from './rooms/rooms.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'chat_app',
            synchronize: false,
            autoLoadEntities: true,
        }),
        MessagesModule,
        UsersModule,
        AuthenticationModule,
        RoomsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
