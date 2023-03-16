import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTableCharacter1674441062295
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table character(
            id serial,
            id_origin int unique,
            name text,
            description text,
            modified text,
            image_url text,
            resource_url text,
            primary key (id,id_origin)
        )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        drop table character
        `);
  }
}
