import { MigrationInterface, QueryRunner } from 'typeorm';

export class data1676950125739 implements MigrationInterface {
  name = 'data1676950125739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "developers" DROP CONSTRAINT "FK_0a5acd93616131ebb033e566c16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ADD CONSTRAINT "UQ_0a5acd93616131ebb033e566c16" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ADD CONSTRAINT "FK_0a5acd93616131ebb033e566c16" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "developers" DROP CONSTRAINT "FK_0a5acd93616131ebb033e566c16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers" DROP CONSTRAINT "UQ_0a5acd93616131ebb033e566c16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ADD CONSTRAINT "FK_0a5acd93616131ebb033e566c16" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
