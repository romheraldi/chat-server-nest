import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class rooms1667623765415 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rooms',
                columns: [
                    {
                        name: 'id',
                        type: 'SERIAL',
                        isPrimary: true,
                    },
                    {
                        name: 'socket',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'integer',
                    },
                    {
                        name: 'another_user_id',
                        type: 'integer',
                    },
                ],
            }),
        )

        await queryRunner.createForeignKeys('rooms', [
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['another_user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('rooms')
        const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1)
        const anotherUserForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('another_user_id') !== -1)
        await queryRunner.dropForeignKeys('rooms', [userForeignKey, anotherUserForeignKey])
        await queryRunner.dropTable('rooms')
    }
}
