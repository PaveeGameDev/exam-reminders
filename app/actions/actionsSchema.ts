import { z } from "zod";

export const joinClassSchema = z.object({
  classId: z.coerce.number(),
});

export const writeExamSchema = z.object({
  content: z.string(),
  date: z.string().transform((arg) => new Date(arg)),
  subjectId: z.coerce.number(),
  examTypeId: z.coerce.number(),
});
