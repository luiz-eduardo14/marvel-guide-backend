import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createTableScriptsRunners1683165193643
  implements MigrationInterface
{
  private readonly table = new Table({
    name: 'scripts_runners',
    columns: [
      {
        name: 'id',
        type: 'serial',
        isPrimary: true,
      },
      {
        name: 'name',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'time',
        type: 'date',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}
