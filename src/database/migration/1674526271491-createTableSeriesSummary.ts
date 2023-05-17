import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTableSeriesSummary1674526271491
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS summary_serie(
            id SERIAL PRIMARY KEY,
            id_character int not null,
            id_serie int not null
        )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        drop table if exists summary_serie
    `);
  }
}
