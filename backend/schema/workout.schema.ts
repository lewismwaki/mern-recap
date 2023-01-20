import * as z from "zod";

export const WorkoutSchema = z.object({
  title: z.string({ required_error: "title is required" }),
  reps: z.number({ required_error: "reps is required" }),
  load: z.number({ required_error: "load is required" }),
  user_id: z.string({ required_error: "user_id is required" }),
});

export type WorkoutSchemaType = z.infer<typeof WorkoutSchema>;
