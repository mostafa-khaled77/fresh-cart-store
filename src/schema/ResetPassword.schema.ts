import * as z from "zod";

export const emailSchema = z.object({
  email: z.email({ message: "Invalid email address." }),
});
export type EmailValues = z.infer<typeof emailSchema>;

export const codeSchema = z.object({
  code: z.string().min(6, { message: "Code must be 6 digits." }).max(6, { message: "Code must be 6 digits." }),
});
export type CodeValues = z.infer<typeof codeSchema>;

export const newPasswordSchema = z.object({
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match.",
  path: ["confirmNewPassword"],
});
export type NewPasswordValues = z.infer<typeof newPasswordSchema>;