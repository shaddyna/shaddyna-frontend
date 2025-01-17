import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import { NextPage } from "next";
import React from "react";

const HelpPage: NextPage = () => { 
  return (
    <div>
       <Back title={"Payment"} />
    <div className="container mx-auto p-4 bg-white text-[#182155]">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Shaddyna Help</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="text-sm mb-2">
          Welcome to Shaddyna, your one-stop platform for buying and selling products! As a seller, you can easily list your products, manage orders, and receive payments. As a buyer, you can browse a wide range of products, shop with ease, and support your favorite vendors.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Sign Up as a Vendor</h2>
        <p className="text-sm mb-2">
          To start selling on Shaddyna, follow these simple steps:
        </p>
        <ol className="list-decimal list-inside text-sm mb-2">
          <li>Create a Shaddyna account.</li>
          <li>Navigate to your profile settings.</li>
          <li>Activate your vendor account by entering your M-Pesa details.</li>
          <li>Start uploading your products and manage your storefront.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Process</h2>
        <p className="text-sm mb-2">
          Our platform uses a secure payment system to ensure smooth transactions for both buyers and sellers. Vendors can receive payments through M-Pesa, and buyers can pay using their preferred method.
        </p>
        <p className="text-sm mb-2">
          If you are a vendor, ensure your M-Pesa account is active and linked for smooth payouts.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Need Further Assistance?</h2>
        <p className="text-sm mb-2">
          If you need additional support or have questions about using Shaddyna, feel free to reach out to us:
        </p>
        <p className="text-sm mb-2">
          Email: <span className="font-semibold">shaddyna2211@gmail.com</span>
        </p>
        <p className="text-sm mb-2">
          Call Us: <span className="font-semibold">+254 702714736</span>
        </p>
      </section>

      <footer className="text-center mt-8">
        <p className="text-sm text-[#ff199c]">© 2025 Shaddyna. All rights reserved.</p>
      </footer>
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default HelpPage;

