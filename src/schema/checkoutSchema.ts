import * as z from "zod";
export const checkoutSchema = z.object({
  details: z.string().min(10, "Details must be at least 10 characters").max(100, "Details too long"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number (11 digits)"),
  city: z.string().min(3, "City must be at least 3 characters"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;