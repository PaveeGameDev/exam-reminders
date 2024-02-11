/*
  Warnings:

  - Added the required column `examId` to the `UserExamNotesPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userexamnotespreferences` ADD COLUMN `examId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserExamNotesPreferences` ADD CONSTRAINT `UserExamNotesPreferences_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
