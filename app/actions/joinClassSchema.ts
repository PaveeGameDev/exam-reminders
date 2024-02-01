import { z } from "zod";

export const joinClassSchema = z.object({
  classId: z.coerce.number(),
});
