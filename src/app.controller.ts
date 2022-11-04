import { Controller, Get, Request } from '@nestjs/common'
import { AppService } from './app.service'
import { responseJson } from './utils/responseJson'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(@Request() req) {
        return responseJson(req.user)
        // return this.appService.getHello()
    }
}
