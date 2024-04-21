import * as z from "zod";
export const CommentValidationSchema = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters" }),
});
