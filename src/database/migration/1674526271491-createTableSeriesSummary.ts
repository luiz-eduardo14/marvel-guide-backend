import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTableSeriesSummary1674526271491 implements MigrationInterface {
  async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table series_summary(
            id serial primary key,
            id_origin int references character(id_origin),
            name text,
            resource_uri text
        )
    `);
  }

  async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        drop table series_summary
    `);
  }
}
