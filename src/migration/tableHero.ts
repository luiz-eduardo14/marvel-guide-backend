import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTableCharacter1674441062294 implements MigrationInterface {
  async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table character(
            id serial,
            id_origin int,
            description text,
            modified date,
            imageURL text,
            resourceURI text,
            primary key (id,id_origin)
        )
    `);
  }

  async down (queryRunner: QueryRunner): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
