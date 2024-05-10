-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_subjectId_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "ClassSubjects" (
    "id" SERIAL NOT NULL,
    "classId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ClassSubjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSubjectUserPreference" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "classSubjectsId" INTEGER NOT NULL,
    "classId" INTEGER,
    "stateId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ClassSubjectUserPreference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassSubjects" ADD CONSTRAINT "ClassSubjects_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubjectUserPreference" ADD CONSTRAINT "ClassSubjectUserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubjectUserPreference" ADD CONSTRAINT "ClassSubjectUserPreference_classSubjectsId_fkey" FOREIGN KEY ("classSubjectsId") REFERENCES "ClassSubjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubjectUserPreference" ADD CONSTRAINT "ClassSubjectUserPreference_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
