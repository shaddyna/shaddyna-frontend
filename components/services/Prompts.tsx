
// components/Prompts.tsx
import { motion } from "framer-motion";
import { FiAlertCircle, FiClock, FiStar, FiX } from "react-icons/fi";

export const AdminPrompt = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
      <div className="flex justify-end mb-2">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>
      <div className="mb-4 text-[#bf2c7e]">
        <FiAlertCircle className="w-12 h-12 mx-auto" />
      </div>
      <h2 className="text-xl font-bold text-[#0f1c47] mb-4">Admin Restriction</h2>
      <p className="text-gray-700 mb-6">Administrators cannot create shops. Please use a seller or customer account.</p>
      <button
        className="px-6 py-3 bg-[#0f1c47] text-white rounded-md hover:bg-[#1a2d5a]"
        onClick={onClose}
      >
        Understood
      </button>
    </div>
  </div>
);

export const MembershipPrompt = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <FiX className="w-5 h-5 text-gray-500" />
      </button>

      <div className="relative z-10 p-8 text-center">
        <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] rounded-full mb-6">
          <FiStar className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Unlock Premium Features
        </h2>
        <p className="text-gray-500 mb-6">
          Upgrade to become a member and enjoy exclusive benefits today
        </p>

        <div className="space-y-3 mb-8 text-left">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Create your own skills</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Premium member dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Priority customer support</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <div className="flex justify-center items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">Ksh 500</span>
            <span className="text-gray-500">/month</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Cancel anytime</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.href = '/member-membership'}
            className="w-full px-6 py-3.5 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Upgrade Now
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);

export const SellerPrompt = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <FiX className="w-5 h-5 text-gray-500" />
      </button>

      <div className="relative z-10 p-8 text-center">
        <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] rounded-full mb-6">
          <FiStar className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Unlock Premium Features
        </h2>
        <p className="text-gray-500 mb-6">
          Upgrade to become a seller and enjoy exclusive benefits today
        </p>

        <div className="space-y-3 mb-8 text-left">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Create your own shop</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Premium member dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Priority customer support</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <div className="flex justify-center items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">Ksh 500</span>
            <span className="text-gray-500">/month</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Cancel anytime</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.href = '/member-membership'}
            className="w-full px-6 py-3.5 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Upgrade Now
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);


export const PendingRequestPrompt = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <FiX className="w-5 h-5 text-gray-500" />
      </button>

      <div className="relative z-10 p-8 text-center">
        <div className="mx-auto flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
          <FiClock className="w-8 h-8 text-yellow-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Request Pending Approval
        </h2>
        <p className="text-gray-600 mb-6">
          Your seller membership request is currently being reviewed by our team.
        </p>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <p className="text-gray-700">
            We'll notify you via email once your request has been processed.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-[#0f1c47] text-white font-medium rounded-lg hover:bg-[#1a2d5a] transition-colors"
        >
          Understood
        </button>
      </div>
    </motion.div>
  </div>
);

export const ErrorToast = ({ error, onClose }: { error: string, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg z-50 max-w-xs"
  >
    <div className="flex items-center">
      <FiAlertCircle className="w-5 h-5 mr-2" />
      <p>{error}</p>
    </div>
  </motion.div>
);