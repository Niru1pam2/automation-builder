import { z } from "zod";

export const EditUserProfileSchema = z.object({
  email: z.email().min(1, {
    error: "Email is required",
  }),
  name: z.string().min(1, {
    error: "Required",
  }),
});
