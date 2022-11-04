import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    const data = request?.cookies['nekot'] || { token: request?.header('x-auth') }
                    if (!data) {
                        return null
                    }
                    return data.token
                },
            ]),
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
