import { MigrationInterface, QueryRunner } from "typeorm"

export default class createTableRequestMarvel1683674002634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS request_marvel (
            id serial primary key,
            request_count int default 0,
            request_date date unique not null
        );        
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS request_marvel;
        `)
    }

}
