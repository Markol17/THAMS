import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1607553228450 implements MigrationInterface {
    name = 'Initial1607553228450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prescription" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unitsPerDay" integer NOT NULL, "numAdministrationsPerDay" integer NOT NULL, "methodOfAdministration" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "patientId" integer NOT NULL, CONSTRAINT "PK_eaba5e4414e5382781e08467b51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staff_member" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "bipperExtension" integer NOT NULL, "password" character varying NOT NULL, "type" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f5ac79f0b9ec1e1ceebc6f7b35d" UNIQUE ("email"), CONSTRAINT "PK_342343208cbc30b3c14a976b0a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staff_member_patient" ("patientId" integer NOT NULL, "staffMemberId" integer NOT NULL, CONSTRAINT "PK_690bbb3e5f8ca12342705114a80" PRIMARY KEY ("patientId", "staffMemberId"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "insuranceNumber" integer NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "address" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "gender" character varying NOT NULL, "maritalStatus" character varying NOT NULL, "externalDoctor" character varying, "nextOfKin" character varying NOT NULL, "privateInsuranceNumber" integer, "roomNumber" integer, "bedNumber" integer, "isAdmitted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "divisionId" integer, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "division" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "chargeNurseId" integer NOT NULL, "location" character varying NOT NULL, "numBeds" integer NOT NULL, "phoneNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_296566b07c0653123c292aa2f85" UNIQUE ("name"), CONSTRAINT "REL_933670e898d2d93890c7f6ad6a" UNIQUE ("chargeNurseId"), CONSTRAINT "PK_b6f0d207e38106dbddabab3a078" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_d9d1ecabc97e4de5c07a1795279" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_member_patient" ADD CONSTRAINT "FK_844b204be0bfe6619346d5a2ece" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_member_patient" ADD CONSTRAINT "FK_621b885a3f85221b1b67807a23b" FOREIGN KEY ("staffMemberId") REFERENCES "staff_member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_dd0a9de126d8a86c66bbcc42e5b" FOREIGN KEY ("divisionId") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "division" ADD CONSTRAINT "FK_933670e898d2d93890c7f6ad6ab" FOREIGN KEY ("chargeNurseId") REFERENCES "staff_member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "division" DROP CONSTRAINT "FK_933670e898d2d93890c7f6ad6ab"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_dd0a9de126d8a86c66bbcc42e5b"`);
        await queryRunner.query(`ALTER TABLE "staff_member_patient" DROP CONSTRAINT "FK_621b885a3f85221b1b67807a23b"`);
        await queryRunner.query(`ALTER TABLE "staff_member_patient" DROP CONSTRAINT "FK_844b204be0bfe6619346d5a2ece"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_d9d1ecabc97e4de5c07a1795279"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "division"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "staff_member_patient"`);
        await queryRunner.query(`DROP TABLE "staff_member"`);
        await queryRunner.query(`DROP TABLE "prescription"`);
    }

}
