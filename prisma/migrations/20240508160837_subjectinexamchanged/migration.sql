-- DropForeignKey
ALTER TABLE `exam` DROP FOREIGN KEY `Exam_subjectId_fkey`;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `ClassSubjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
