import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateisPublicColumnApplicationTable1730194801957 implements MigrationInterface {
    name = 'UpdateisPublicColumnApplicationTable1730194801957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_8b2f5557f9958ac8ee2eeec5006\` ON \`questions\``);
        await queryRunner.query(`ALTER TABLE \`applications\` CHANGE \`isPublic\` \`isPublic\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_39f6c0aea84685891b56ecff971\` FOREIGN KEY (\`applicationId\`) REFERENCES \`applications\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_39f6c0aea84685891b56ecff971\``);
        await queryRunner.query(`ALTER TABLE \`applications\` CHANGE \`isPublic\` \`isPublic\` tinyint NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_8b2f5557f9958ac8ee2eeec5006\` ON \`questions\` (\`applicationId\`)`);
    }

}
