import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1664818358555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createDatabase('jccar', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropDatabase('jccar', true);
  }
}
