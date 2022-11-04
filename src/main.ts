import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as passport from 'passport'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.use(
        session({
            secret: 'asdf',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 3600000 },
        }),
    )

    app.use(cookieParser())
    app.use(passport.initialize())
    app.use(passport.session())
    await app.listen(3000)
}

bootstrap()
