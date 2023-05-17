import { MigrationInterface, QueryRunner } from "typeorm"

export default class createTableSerie1684180727196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS serie (
                id SERIAL PRIMARY KEY,
                id_origin int not null,
                title text NOT NULL,
                description text,
                start_year integer,
                end_year integer,
                rating text,
                image_url text,
                resource_url text
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS serie
        `)
    }

}
