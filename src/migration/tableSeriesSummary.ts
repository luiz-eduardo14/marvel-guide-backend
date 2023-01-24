import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTableSeriesSummary1674526271490 implements MigrationInterface {
  async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table series_summary(
            id serial primary key,
            id_origin int references character(id_origin),
            name text,
            resourceURI text
        )
    `);
  }

  async down (queryRunner: QueryRunner): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
