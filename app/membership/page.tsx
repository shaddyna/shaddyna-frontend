'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiArrowLeft, FiCheckCircle, FiDollarSign, FiUser, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function MembershipPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mpesaName, setMpesaName] = useState('');
  const [mpesaCode, setMpesaCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const amount = 500; // Static amount in KES

  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      setMpesaName(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/membership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mpesaName: mpesaName,
          mpesaCode
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>

          <div className="relative z-10 p-8 text-center">
            <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <FiCheckCircle className="w-8 h-8 text-green-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Request Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Your membership request has been received. We'll review it and notify you once approved.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-8">
              <p className="text-gray-700">
                You'll receive a confirmation email with next steps shortly.
              </p>
            </div>

            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>

          <div className="relative z-10 p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] rounded-full mb-4">
                <FiDollarSign className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Seller</h1>
              <p className="text-gray-600">
                Complete your membership payment to unlock premium features
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start"
              >
                <FiX 
                  className="flex-shrink-0 h-5 w-5 text-red-500 mr-3 mt-0.5 cursor-pointer" 
                  onClick={() => setError('')}
                />
                <p className="text-red-600">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600">Membership Fee</span>
                    <span className="text-xl font-bold text-[#bf2c7e]">KES {amount.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    One-time payment to activate your seller account
                  </div>
                </div>

                {/* M-Pesa Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    M-Pesa Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={mpesaName}
                      onChange={(e) => setMpesaName(e.target.value)}
                      placeholder="Enter your M-Pesa name"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                      required
                    />
                  </div>
                </div>

                {/* M-Pesa Transaction Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    M-Pesa Transaction Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={mpesaCode}
                      onChange={(e) => setMpesaCode(e.target.value)}
                      placeholder="Enter your M-Pesa transaction code"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Make payment to <span className="font-medium">Paybill: 123456</span> using your registered phone number
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="relative group w-full px-6 py-4 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden disabled:opacity-70"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Processing...' : 'Complete Payment'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#d64285] to-[#bf2c7e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-0 left-0 w-10 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[400%] transition-transform duration-700"></span>
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">What you'll get:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="flex-shrink-0 h-5 w-5 text-[#bf2c7e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Create and manage your own shop</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="flex-shrink-0 h-5 w-5 text-[#bf2c7e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Premium seller dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="flex-shrink-0 h-5 w-5 text-[#bf2c7e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Priority customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}