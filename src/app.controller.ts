import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { responseJson } from './utils/responseJson'
import { AuthenticatedGuard } from './authentication/authenticated.guard'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(AuthenticatedGuard)
    @Get()
    getHello(@Request() req) {
        return responseJson(req.user)
        // return this.appService.getHello()
    }
}
