/*
  Warnings:

  - Added the required column `classSubjectsId` to the `ClassSubjectUserPreference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `classsubjectuserpreference` DROP FOREIGN KEY `ClassSubjectUserPreference_classId_fkey`;

-- AlterTable
ALTER TABLE `classsubjectuserpreference` ADD COLUMN `classSubjectsId` INTEGER NOT NULL,
    MODIFY `classId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ClassSubjectUserPreference` ADD CONSTRAINT `ClassSubjectUserPreference_classSubjectsId_fkey` FOREIGN KEY (`classSubjectsId`) REFERENCES `ClassSubjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassSubjectUserPreference` ADD CONSTRAINT `ClassSubjectUserPreference_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
