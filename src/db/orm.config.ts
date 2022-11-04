import { DataSource } from 'typeorm'
import * as path from 'path'

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'chat_app',
    entities: [path.resolve(process.cwd(), 'src', '**', '*.entity{.js,.ts}')],
    migrations: [path.resolve(process.cwd(), 'src', 'db', 'migrations', '*{.js,.ts}')],
})
