// components/ReferralDashboard.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ReferralDashboard = () => {
  const { data: session } = useSession();
  const [referralData, setReferralData] = useState<{
    referralCode: string;
    referralCount: number;
  } | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/auth/profile')
        .then(res => res.json())
        .then(data => setReferralData(data))
        .catch(err => toast.error('Failed to load referral data'));
    }
  }, [session]);

  if (!referralData) return null;

  const referralLink = `${window.location.origin}/register?ref=${referralData.referralCode}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Referral Dashboard</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Referral Link</label>
        <div className="flex">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#bf2c7e] text-sm"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              toast.success('Link copied to clipboard!');
            }}
            className="bg-[#bf2c7e] text-white px-3 py-2 rounded-r-md hover:bg-[#a8246a] text-sm"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="bg-[#f8f0f5] p-4 rounded-lg">
        <h3 className="text-sm font-medium text-[#bf2c7e] mb-1">Referral Stats</h3>
        <p className="text-sm text-gray-600">
          People referred: <span className="font-semibold">{referralData.referralCount}</span>
        </p>
      </div>
    </div>
  );
};

export default ReferralDashboard;