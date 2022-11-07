import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class messages1667803636234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'messages',
                columns: [
                    {
                        name: 'id',
                        type: 'SERIAL',
                        isPrimary: true,
                    },
                    {
                        name: 'room_id',
                        type: 'integer',
                    },
                    {
                        name: 'message',
                        type: 'varchar',
                    },
                    {
                        name: 'sender_id',
                        type: 'integer',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                ],
            }),
        )

        await queryRunner.createForeignKeys('messages', [
            new TableForeignKey({
                columnNames: ['room_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'rooms',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['sender_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('users')
        const senderForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('sender_id') !== -1)
        const roomForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('room_id') !== -1)
        await queryRunner.dropForeignKeys('users', [senderForeignKey, roomForeignKey])
        await queryRunner.dropTable('users')
    }

}
