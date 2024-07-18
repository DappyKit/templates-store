import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1721248278849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'userName',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'displayName',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'photoUrl',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
