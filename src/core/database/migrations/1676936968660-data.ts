import { MigrationInterface, QueryRunner } from 'typeorm';

export class data1676936968660 implements MigrationInterface {
  name = 'data1676936968660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "language" character varying(100) NOT NULL, CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "states" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "initials" character varying(2) NOT NULL, "country_id" integer NOT NULL, CONSTRAINT "UQ_fe52f02449eaf27be2b2cb7acda" UNIQUE ("name"), CONSTRAINT "UQ_edb1ecdd81ccd1462789350aaa6" UNIQUE ("initials"), CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "state_id" integer NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(50) NOT NULL, "salt" character varying NOT NULL, "active" boolean NOT NULL DEFAULT false, "city_id" integer NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recruiters" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "user_id" integer NOT NULL, CONSTRAINT "PK_1999e5a8e68fa6c525eed22c970" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "technologies" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, CONSTRAINT "PK_9a97465b79568f00becacdd4e4a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "developers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "acceptedRemoteWork" boolean NOT NULL DEFAULT false, "monthsOfExperience" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_247719240b950bd26dec14bdd21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "developers_technologies" ("developersId" integer NOT NULL, "technologiesId" integer NOT NULL, CONSTRAINT "PK_1e503d81d1e09f06b7a8691f76f" PRIMARY KEY ("developersId", "technologiesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8a8de5a720c9388c592a7f1bd5" ON "developers_technologies" ("developersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3dd8058f32784181816b0b66b9" ON "developers_technologies" ("technologiesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "states" ADD CONSTRAINT "FK_f3bbd0bc19bb6d8a887add08461" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" ADD CONSTRAINT "FK_1229b56aa12cae674b824fccd13" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_03934bca2709003c5f08fd436d2" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruiters" ADD CONSTRAINT "FK_0c851bd72ee5568e8793794624b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ADD CONSTRAINT "FK_0a5acd93616131ebb033e566c16" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers_technologies" ADD CONSTRAINT "FK_8a8de5a720c9388c592a7f1bd5a" FOREIGN KEY ("developersId") REFERENCES "developers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers_technologies" ADD CONSTRAINT "FK_3dd8058f32784181816b0b66b93" FOREIGN KEY ("technologiesId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "developers_technologies" DROP CONSTRAINT "FK_3dd8058f32784181816b0b66b93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers_technologies" DROP CONSTRAINT "FK_8a8de5a720c9388c592a7f1bd5a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "developers" DROP CONSTRAINT "FK_0a5acd93616131ebb033e566c16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recruiters" DROP CONSTRAINT "FK_0c851bd72ee5568e8793794624b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_03934bca2709003c5f08fd436d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" DROP CONSTRAINT "FK_1229b56aa12cae674b824fccd13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "states" DROP CONSTRAINT "FK_f3bbd0bc19bb6d8a887add08461"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3dd8058f32784181816b0b66b9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8a8de5a720c9388c592a7f1bd5"`,
    );
    await queryRunner.query(`DROP TABLE "developers_technologies"`);
    await queryRunner.query(`DROP TABLE "developers"`);
    await queryRunner.query(`DROP TABLE "technologies"`);
    await queryRunner.query(`DROP TABLE "recruiters"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "states"`);
    await queryRunner.query(`DROP TABLE "countries"`);
  }
}
