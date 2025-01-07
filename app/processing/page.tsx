"use client"
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation'



const PaymentProcessingPage: NextPage = () => {
  const router = useRouter();
const handleClick = () => {
  // Navigate to the Delivery Page
  router.push('/');
};
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeadNavigation />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 bg-white rounded-lg shadow-lg border border-[#182155]">
          <h1 className="text-xl sm:text-3xl text-center font-semibold text-[#182155] mb-4 sm:mb-6">
            Payment is Being Processed
          </h1>

          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-4 border-[#ff199c] rounded-full animate-spin"></div>

            <p className="text-sm sm:text-lg text-center text-[#182155]">
              Thank you for your payment! We are processing your transaction to complete your registration as a seller.
            </p>

            <p className="text-xs sm:text-md text-center text-[#182155]">
              Please be patient while we verify and finalize your payment. This may take a few moments.
            </p>

            <div className="text-center">
              <p className="text-sm sm:text-base font-medium text-[#182155]">While you wait:</p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-[#182155]">
                <li>Ensure your payment information is correct.</li>
                <li>If you have any issues, contact our support team.</li>
                <li>We will notify you once the process is complete.</li>
              </ul>
            </div>

            <div className="flex justify-center mt-4 sm:mt-6">
              <button className="py-2 px-4 sm:py-3 sm:px-6 bg-[#ff199c] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#e0157f] transition duration-300"
              onClick={handleClick}
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default PaymentProcessingPage;

// pages/payment-processing.tsx

/*import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import { NextPage } from 'next';

const PaymentProcessingPage: NextPage = () => {
  return (
    <div>
        <HeadNavigation /> 
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl border border-[#182155]">
        <h1 className="text-3xl text-center font-semibold text-[#182155] mb-6">Payment is Being Processed</h1>
        
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 border-4 border-t-4 border-[#ff199c] rounded-full animate-spin"></div>

          <p className="text-[#182155] text-lg text-center">
            Thank you for your payment! We are processing your transaction to complete your registration as a seller.
          </p>

          <p className="text-[#182155] text-md text-center">
            Please be patient while we verify and finalize your payment. This may take a few moments.
          </p>

          <div className="text-center">
            <p className="text-[#182155] font-medium">While you wait:</p>
            <ul className="list-disc list-inside text-[#182155]">
              <li>Ensure your payment information is correct.</li>
              <li>If you have any issues, contact our support team.</li>
              <li>We will notify you once the process is complete.</li>
            </ul>
          </div>

          <div className="flex justify-center mt-6">
            <button className="py-3 px-6 bg-[#ff199c] text-white font-semibold rounded-lg hover:bg-[#e0157f] transition duration-300">
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default PaymentProcessingPage;*/

// pages/payment-processing.tsx


