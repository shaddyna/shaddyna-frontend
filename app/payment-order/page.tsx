"use client";

import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCheckoutStore } from "@/store/checkout-store";
import { useRouter } from "next/navigation"; 
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import Back from "@/components/Back";

const paymentSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  mpesaCode: z.string().min(6, "M-Pesa code must be at least 6 characters"),
  mpesaName: z.string().min(2, "Name must be at least 2 characters"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentPage() {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      phoneNumber: "",
      mpesaCode: "",
      mpesaName: "",
    },
  });

  const setPaymentDetails = useCheckoutStore((state) => state.setPaymentDetails);
  const router = useRouter(); 

  function onSubmit(data: PaymentFormData) {
    setPaymentDetails(data); 
    console.log("Payment data submitted:", data);
    router.push("/confirmation");
  }

  return (
<div>
      <Back title={"Payment"} />
    <div className="bg-gray-50 min-h-screen flex flex-col">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Payment</h1>
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+254 *** *** ***" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mpesaCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>M-Pesa Code</FormLabel>
                  <FormControl>
                    <Input placeholder="M-Pesa code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mpesaName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (as on M-Pesa)</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
              Confirm Payment
            </Button>
          </form>
        </Form>
      </Card>
    </div>
    <Footer />
    </div>
    </div>
  );
}
