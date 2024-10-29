import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTables1730186559752 implements MigrationInterface {
    name = 'RenameTables1730186559752'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("user", "users");
        await queryRunner.renameTable("application", "applications");
        await queryRunner.renameTable("question", "questions");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("users", "user");
        await queryRunner.renameTable("applications", "application");
        await queryRunner.renameTable("qustions", "question");
    }

}
