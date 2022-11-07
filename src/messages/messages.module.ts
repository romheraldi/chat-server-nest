import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesGateway } from './messages.gateway'
import { RoomsModule } from '../rooms/rooms.module'
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";

@Module({
    providers: [MessagesGateway, MessagesService],
    imports: [RoomsModule, TypeOrmModule.forFeature([Message])],
})
export class MessagesModule {}
