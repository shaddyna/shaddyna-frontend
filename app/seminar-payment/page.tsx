import { Suspense } from "react";
import SeminarPaymentComponent from "@/components/SeminarPaymentComponent";

export default function SeminarPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SeminarPaymentComponent />
    </Suspense>
  );
}
