import { Suspense } from "react";
import SeminarOtherPaymentComponent from "@/components/SeminarOtherPaymentComponent";

export default function SeminarOtherPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SeminarOtherPaymentComponent />
    </Suspense>
  );
}
