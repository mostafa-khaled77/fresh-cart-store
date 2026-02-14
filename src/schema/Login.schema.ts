import z,{email , string} from "zod"

export const schema = z.object({
  email: z.email("Invalid Email Address"),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Must be strong (A,a,1,#)"),
});

export type LoginValues = z.infer<typeof schema>;