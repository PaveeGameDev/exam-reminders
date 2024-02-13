-- DropForeignKey
ALTER TABLE `userexampreferences` DROP FOREIGN KEY `UserExamPreferences_examNoteId_fkey`;

-- AlterTable
ALTER TABLE `userexampreferences` MODIFY `examNoteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `UserExamPreferences` ADD CONSTRAINT `UserExamPreferences_examNoteId_fkey` FOREIGN KEY (`examNoteId`) REFERENCES `ExamNote`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
