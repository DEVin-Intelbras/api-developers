import { MigrationInterface, QueryRunner } from "typeorm";

export class data1675806648489 implements MigrationInterface {
    name = 'data1675806648489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "language" character varying(100) NOT NULL, CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "states" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "initials" character varying(2) NOT NULL, "country_id" integer NOT NULL, CONSTRAINT "UQ_fe52f02449eaf27be2b2cb7acda" UNIQUE ("name"), CONSTRAINT "UQ_edb1ecdd81ccd1462789350aaa6" UNIQUE ("initials"), CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "state_id" integer NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(50) NOT NULL, "salt" character varying NOT NULL, "active" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "city_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "states" ADD CONSTRAINT "FK_f3bbd0bc19bb6d8a887add08461" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_1229b56aa12cae674b824fccd13" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_03934bca2709003c5f08fd436d2" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_03934bca2709003c5f08fd436d2"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_1229b56aa12cae674b824fccd13"`);
        await queryRunner.query(`ALTER TABLE "states" DROP CONSTRAINT "FK_f3bbd0bc19bb6d8a887add08461"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "states"`);
        await queryRunner.query(`DROP TABLE "countries"`);
    }

}
