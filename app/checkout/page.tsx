import { CheckoutDetails } from "@/components/checkout-details"
import Footer from "@/components/Footer"
import HeadNavigation from "@/components/HeadNavigation"

export default function CheckoutPage() {
  return (<div className="bg-gray-50 min-h-screen flex flex-col">
    <HeadNavigation />
  <CheckoutDetails />
  <Footer />
  </div>
)
} 