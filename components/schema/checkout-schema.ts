import * as z from "zod"

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  postalCode: z.string().min(4, "Please enter a valid postal code"),
  additionalInfo: z.string().optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema> 