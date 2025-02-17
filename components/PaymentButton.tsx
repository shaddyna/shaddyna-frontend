"use client"; // ✅ Make this a Client Component

const PaymentButton = () => {
  const handlePayment = () => {
    alert(`Redirecting to payment...`);
    // 🔹 Integrate payment gateway logic here
  };

  return (
    <button
      onClick={handlePayment}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Invest Now
    </button>
  );
};

export default PaymentButton;
