import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIpWhitelistTable1759905642638 implements MigrationInterface {
    name = 'CreateIpWhitelistTable1759905642638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ip_whitelist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipAddress" character varying NOT NULL, CONSTRAINT "UQ_528ae409f47e87a06c6cf0942e6" UNIQUE ("ipAddress"), CONSTRAINT "PK_9a418863b2276be926c63f3d4f2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ip_whitelist"`);
    }

}
