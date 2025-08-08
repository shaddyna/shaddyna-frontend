import { Rocket } from 'lucide-react';
import { ShoppingBag, Users, CreditCard, Package, Gift, HelpCircle } from 'react-feather';

const SellOnShaddynaPage = () => {
  // Assuming this would come from props or context in a real implementation
  const hasReferral = false;
  const userName = "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <header className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Start <span className="text-[#bf2c7e]">Selling</span> Shaddyna
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Reach thousands of buyers. Grow your business. Earn rewards with referrals.
        </p>
      </header>

      {/* Main CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {userName && (
            <p className="text-lg text-gray-600 mb-4">
              Hi <span className="font-semibold text-[#bf2c7e]">{userName}</span>, ready to start selling?
            </p>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Join Our Growing Community of Sellers
          </h2>
            <button className="bg-[#bf2c7e] hover:bg-[#e61689] text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg">
            <span className="block sm:hidden">Start</span> 
            <span className="hidden sm:inline">Start Your Seller Journey</span>
            </button>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Sell on Shaddyna?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-pink-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Users className="text-[#bf2c7e]" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Huge Audience</h3>
            <p className="text-gray-600">
              Access thousands of active buyers looking for products like yours.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-pink-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="text-[#bf2c7e]" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
            <p className="text-gray-600">
              Seamless payment integration with automatic payouts to your account.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-pink-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Gift className="text-[#bf2c7e]" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Referral Bonuses</h3>
            <p className="text-gray-600">
              Earn extra income by inviting other sellers to join the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Referral Section */}
      {hasReferral && (
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-gradient-to-r from-[#bf2c7e] to-[#ff6b6b] p-8 rounded-2xl text-white">
            <h2 className="text-2xl font-bold mb-4">Have a referral code?</h2>
            <p className="mb-6">Enter it here to get extra perks on your seller journey!</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter referral code"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-[#bf2c7e] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                Apply Code
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Steps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Start Selling in 4 Simple Steps
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#bf2c7e] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              1
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md h-full">
              <ShoppingBag className="mx-auto text-[#bf2c7e] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">
                Sign up as a seller in just a few minutes.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#bf2c7e] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              2
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md h-full">
              <Package className="mx-auto text-[#bf2c7e] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Add Products</h3>
              <p className="text-gray-600">
                Upload your products with images and details.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#bf2c7e] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              3
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md h-full">
              <CreditCard className="mx-auto text-[#bf2c7e] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Start Selling</h3>
              <p className="text-gray-600">
                Get orders and receive payments automatically.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#bf2c7e] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              4
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md h-full">
              <Rocket className="mx-auto text-[#bf2c7e] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Grow & Earn</h3>
              <p className="text-gray-600">
                Invite others and earn referral bonuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="inline-flex items-center text-[#bf2c7e] font-semibold hover:text-[#e61689]">
            <HelpCircle className="mr-2" size={20} />
            Need more help? Contact Seller Support
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#bf2c7e] py-16 text-center text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Seller Journey?</h2>
          <p className="text-xl mb-8">Join thousands of sellers growing their business with Shaddyna.</p>
          <button className="bg-white text-[#bf2c7e] font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Sign Up as a Seller
          </button>
        </div>
      </section>
    </div>
  );
};

// FAQ data
const faqs = [
  {
    question: "How much does it cost to sell on Shaddyna?",
    answer: "We offer competitive commission rates that vary by product category. There are no upfront fees to join and list your products."
  },
  {
    question: "How do I get paid for my sales?",
    answer: "Payments are automatically deposited to your linked bank account every 7 days. You can track all payments in your seller dashboard."
  },
  {
    question: "Can I use my own shipping method?",
    answer: "Yes, you can use your preferred shipping carrier or opt for Shaddyna's integrated shipping solutions for discounted rates."
  },
  {
    question: "How do referral bonuses work?",
    answer: "When you refer another seller to Shaddyna using your unique referral code, you'll earn a percentage of their first month's commission."
  }
];

export default SellOnShaddynaPage;