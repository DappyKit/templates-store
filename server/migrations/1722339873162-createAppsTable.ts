import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppsTable1722339873162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "app",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "icon",
                    type: "varchar",
                },
                {
                    name: "creationDate",
                    type: "varchar",
                },
                {
                    name: "updateDate",
                    type: "varchar",
                },
                {
                    name: "authorId",
                    type: "int",
                },
                {
                    name: "gitHub",
                    type: "varchar",
                },
                {
                    name: "appFormConfig",
                    type: "varchar",
                },
                {
                    name: "isPublic",
                    type: "boolean",
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("app");
    }

}
