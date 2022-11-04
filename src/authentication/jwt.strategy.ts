import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('x-auth'),
            ignoreExpiration: false,
            secretOrKey: 'aqwer',
        })
    }

    async validate(payload: any) {
        return {
            id: payload.sub,
            username: payload.username,
        }
    }
}
