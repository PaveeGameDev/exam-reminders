import { z } from "zod";

export const joinClassSchema = z.object({
  classId: z.coerce.number(),
});

export const writeExamSchema = z.object({
  content: z.string(),
  date: z.string().transform((arg) => new Date(arg)),
  subjectId: z.coerce.number(),
  examTypeId: z.coerce.number(),
  isPublic: z.boolean(),
});

export const updateExamDateSchema = z.object({
  date: z.string().transform((arg) => new Date(arg)),
});

export const writeExamNoteSchema = z.object({
  content: z.string(),
});

export const createClassSchema = z.object({ className: z.string() });
