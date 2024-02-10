-- CreateTable
CREATE TABLE `UserExamNotesPreferences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `examNoteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserExamNotesPreferences` ADD CONSTRAINT `UserExamNotesPreferences_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExamNotesPreferences` ADD CONSTRAINT `UserExamNotesPreferences_examNoteId_fkey` FOREIGN KEY (`examNoteId`) REFERENCES `ExamNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
