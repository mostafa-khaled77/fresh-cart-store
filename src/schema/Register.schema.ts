import z,{email , string} from "zod"

export const schema = z
  .object({
    name: z.string().min(3, "Min 3 chars.").max(20, "Max 20 chars."),
    email: z.email("Invalid Email Address"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Must be strong (A,a,1,#)"),
    rePassword: z.string(),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian number."),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type RegisterValues = z.infer<typeof schema>;