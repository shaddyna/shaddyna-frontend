/*"use client";

import { motion } from "framer-motion";
import { 
  Phone, Mail, MessageSquare, 
  CreditCard, Shield, FileText,
  Instagram, Twitter, Youtube, 
  ChevronRight
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";

const LuxuryFooter = () => {
  return (
    <footer className="relative bg-[#0f1c47] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating decorative elements *
      <motion.div 
        className="absolute top-20 left-10 w-24 h-24 bg-[#bf2c7e]/10 rounded-full blur-xl"
        animate={{
          x: [0, 15, 0],
          y: [0, 20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-32 right-16 w-20 h-20 bg-[#bf2c7e]/05 rounded-full blur-lg"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content *
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column *
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-[#bf2c7e] ">
               Shaddyna
              </span>
            </h3>
            <p className="mb-6">
              Redefining luxury fashion with exclusive designer pieces crafted with precision and passion.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Youtube, FaPinterest].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-white hover:text-[#bf2c7e] transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links *
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Shipping & Returns', 'FAQs', 'Contact'].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="hover:text-[#bf2c7e] transition-colors flex items-center">
                    <ChevronRight size={14} className="mr-2 text-[#bf2c7e]" /> {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Support *
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Customer Support</h4>
            <ul className="space-y-4">
              <motion.li whileHover={{ x: 5 }}>
                <a href="tel:+18005551234" className="flex items-center hover:text-[#bf2c7e] transition-colors">
                  <Phone size={16} className="mr-3 text-[#bf2c7e]" /> +1 (800) 555-1234
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="mailto:service@extremecollections.com" className="flex items-center hover:text-[#bf2c7e] transition-colors">
                  <Mail size={16} className="mr-3 text-[#bf2c7e]" /> service@extremecollections.com
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="#" className="flex items-center hover:text-[#bf2c7e] transition-colors">
                  <MessageSquare size={16} className="mr-3 text-[#bf2c7e]" /> Live Chat
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Payment & Legal *
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Payment Methods</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Visa', 'MasterCard', 'PayPal', 'Apple Pay', 'Crypto'].map((method, index) => (
                <motion.div
                  key={index}
                  className="bg-[#1a1a1a] px-3 py-2 rounded-md text-xs"
                  whileHover={{ y: -3 }}
                >
                  {method}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <motion.a 
                href="#" 
                className="flex items-center hover:text-[#bf2c7e] transition-colors"
                whileHover={{ x: 3 }}
              >
                <Shield size={14} className="mr-2" /> Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="flex items-center hover:text-[#bf2c7e] transition-colors"
                whileHover={{ x: 3 }}
              >
                <FileText size={14} className="mr-2" /> Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider *
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-[#bf2c7e]/30 to-transparent my-12"
        />

        {/* Copyright *
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-sm text-white"
        >
          © {new Date().getFullYear()} Shaddyna. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;*/

"use client";

import { motion } from "framer-motion";
import {
  Phone, Mail, MessageSquare,
  CreditCard, Shield, FileText,
  Instagram, Twitter, Youtube,
  ChevronRight
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";

const socialIcons = [
  { Icon: Instagram, link: "#" },
  { Icon: Twitter, link: "#" },
  { Icon: Youtube, link: "#" },
  { Icon: FaPinterest, link: "#" },
];

const quickLinks = [
  { label: "About Us", href: "#" },
  { label: "Shipping & Returns", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Contact", href: "#" },
];

const supportLinks = [
  { label: "+254 712 345678", href: "tel:+254712345678", Icon: Phone },
  { label: "support@shaddyna.com", href: "mailto:support@shaddyna.com", Icon: Mail },
  { label: "Live Chat", href: "#", Icon: MessageSquare },
];

const paymentMethods = ["M-Pesa", "Visa", "MasterCard", "PayPal", "Crypto"];

const legalLinks = [
  { label: "Privacy Policy", href: "#", Icon: Shield },
  { label: "Terms of Service", href: "#", Icon: FileText },
];

const LuxuryFooter = () => {
  return (
    <footer className="relative bg-[#0f1c47] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Motion Circles */}
      <motion.div 
        className="absolute top-20 left-10 w-24 h-24 bg-[#bf2c7e]/10 rounded-full blur-xl"
        animate={{ x: [0, 15, 0], y: [0, 20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-32 right-16 w-20 h-20 bg-[#bf2c7e]/5 rounded-full blur-lg"
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-[#bf2c7e]">
              Shaddyna
            </h3>
            <p className="mb-6">
              Celebrating elegance, culture, and luxury curated collections for the confident and classy.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  className="hover:text-[#bf2c7e] transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <a href={href} className="flex items-center hover:text-[#bf2c7e] transition-colors">
                    <ChevronRight size={14} className="mr-2 text-[#bf2c7e]" /> {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Customer Support</h4>
            <ul className="space-y-4">
              {supportLinks.map(({ label, href, Icon }, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href={href} className="flex items-center hover:text-[#bf2c7e] transition-colors">
                    <Icon size={16} className="mr-3 text-[#bf2c7e]" /> {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Payment & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Payment Methods</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="bg-[#1a1a1a] px-3 py-2 rounded-md text-xs"
                  whileHover={{ y: -3 }}
                >
                  {method}
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              {legalLinks.map(({ label, href, Icon }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="flex items-center hover:text-[#bf2c7e] transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <Icon size={14} className="mr-2" /> {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-[#bf2c7e]/30 to-transparent my-12"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-sm"
        >
          © {new Date().getFullYear()} Shaddyna. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;
