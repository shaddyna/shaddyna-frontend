/*"use client"
import { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  transactionCode: string;
  status: 'verified' | 'pending' | 'failed';
}

interface Subscription {
  plan: 'basic' | 'pro' | 'premium';
  nextDueDate: string;
  price: number;
}

export default function SellerPayments() {
  const [balance, setBalance] = useState(45000);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(15000);
  const [subscription, setSubscription] = useState<Subscription>({
    plan: 'pro',
    nextDueDate: '2024-03-15',
    price: 2999
  });
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-02-20',
      amount: 15000,
      transactionCode: 'NBX34F',
      status: 'verified'
    },
    // Add more mock transactions
  ]);

  const subscriptionPlans = [
    { name: 'Basic', price: 1999, features: ['5 products', 'Basic analytics'] },
    { name: 'Pro', price: 2999, features: ['50 products', 'Advanced analytics', '24/7 support'] },
    { name: 'Premium', price: 4999, features: ['Unlimited products', 'Full analytics', 'Priority support'] }
  ];

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawalAmount);
    if (amount > balance) {
      alert('Withdrawal amount exceeds available balance');
      return;
    }
    setPendingWithdrawal(prev => prev + amount);
    setBalance(prev => prev - amount);
    setWithdrawalAmount('');
    setMpesaNumber('');
    alert('Withdrawal request submitted for admin approval');
  };

  const handleSubscriptionChange = (newPlan: 'basic' | 'pro' | 'premium') => {
    setSubscription(prev => ({
      ...prev,
      plan: newPlan,
      price: subscriptionPlans.find(p => p.name.toLowerCase() === newPlan)?.price || prev.price
    }));
    alert('Subscription change request sent to admin');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Balance Overview *
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Available Balance</h3>
          <p className="text-2xl font-bold">KES {balance.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Pending Withdrawal</h3>
          <p className="text-2xl font-bold">KES {pendingWithdrawal.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Next Subscription Due</h3>
          <p className="text-2xl font-bold">{subscription.nextDueDate}</p>
        </div>
      </div>

      {/* Withdrawal Request Form *
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Request Withdrawal</h2>
        <form onSubmit={handleWithdrawal} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount (KES)</label>
            <input
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">MPESA Number</label>
            <input
              type="tel"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              placeholder="07XXXXXXXX"
              required
            />
          </div>
          <button
            type="submit"
            disabled={balance === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Request Withdrawal
          </button>
        </form>
      </div>

      {/* Subscription Management *
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Subscription Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-lg border-2 ${
                subscription.plan === plan.name.toLowerCase() ? 'border-blue-600' : 'border-gray-200'
              }`}
            >
              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold mb-4">KES {plan.price.toLocaleString()}/mo</p>
              <ul className="list-disc pl-5 mb-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-gray-600">{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscriptionChange(plan.name.toLowerCase() as any)}
                className={`w-full py-2 rounded-md ${
                  subscription.plan === plan.name.toLowerCase()
                    ? 'bg-gray-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {subscription.plan === plan.name.toLowerCase() ? 'Current Plan' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History *
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Transaction Code</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="py-3">{transaction.date}</td>
                  <td className="py-3">KES {transaction.amount.toLocaleString()}</td>
                  <td className="py-3">{transaction.transactionCode}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        transaction.status === 'verified'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}*/

"use client"
import Back from '@/components/Back';
import Footer from '@/components/Footer';
import { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  type: 'withdrawal' | 'subscription';
  amount: number;
  transactionCode: string;
  status: 'verified' | 'pending' | 'failed';
}

interface Subscription {
  plan: 'basic' | 'pro' | 'premium';
  status: 'active' | 'pending' | 'expired';
  nextDueDate: string;
  price: number;
}

export default function SellerPayments() {
  const [balance, setBalance] = useState(45000);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(15000);
  const [subscription, setSubscription] = useState<Subscription>({
    plan: 'pro',
    status: 'active',
    nextDueDate: '2024-03-15',
    price: 2999
  });
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-02-20',
      type: 'withdrawal',
      amount: 15000,
      transactionCode: 'NBX34F',
      status: 'verified'
    },
  ]);
  
  // Subscription Payment State
  const [subscriptionPaymentData, setSubscriptionPaymentData] = useState({
    transactionCode: '',
    mpesaNumber: '',
    amount: '',
    selectedPlan: '' as 'basic' | 'pro' | 'premium' | ''
  });

  const subscriptionPlans = [
    { name: 'Basic', id: 'basic', price: 1999, features: ['5 products', 'Basic analytics'] },
    { name: 'Pro', id: 'pro', price: 2999, features: ['50 products', 'Advanced analytics', '24/7 support'] },
    { name: 'Premium', id: 'premium', price: 4999, features: ['Unlimited products', 'Full analytics', 'Priority support'] }
  ];

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawalAmount);
    if (amount > balance) {
      alert('Withdrawal amount exceeds available balance');
      return;
    }
    setPendingWithdrawal(prev => prev + amount);
    setBalance(prev => prev - amount);
    setWithdrawalAmount('');
    setMpesaNumber('');
    alert('Withdrawal request submitted for admin approval');
  };

  const handleSubscriptionPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(subscriptionPaymentData.amount);
    const selectedPlan = subscriptionPlans.find(
      p => p.id === subscriptionPaymentData.selectedPlan
    );

    if (!selectedPlan) {
      alert('Please select a subscription plan');
      return;
    }

    if (amount !== selectedPlan.price) {
      alert(`Amount must match selected plan price (KES ${selectedPlan.price})`);
      return;
    }

    // Add to transactions as pending
    setTransactions(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        type: 'subscription',
        amount: amount,
        transactionCode: subscriptionPaymentData.transactionCode,
        status: 'pending'
      }
    ]);

    // Reset form
    setSubscriptionPaymentData({
      transactionCode: '',
      mpesaNumber: '',
      amount: '',
      selectedPlan: ''
    });

    alert('Subscription payment details submitted for admin verification');
  };

  return (
    <div>
    <Back title={'Payment Management'} />
    <div className="max-w-6xl mx-auto p-6">
      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Available Balance</h3>
          <p className="text-2xl font-bold">KES {balance.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Pending Withdrawal</h3>
          <p className="text-2xl font-bold">KES {pendingWithdrawal.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Subscription Status</h3>
          <p className="text-2xl font-bold capitalize">
            {subscription.plan} ({subscription.status})
          </p>
          <p className="text-sm text-gray-500">Renews on: {subscription.nextDueDate}</p>
        </div>
      </div>

      {/* Withdrawal Request Form (Remains same) */}
      {/* ... */}

      {/* Subscription Payment Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Renew/Upgrade Subscription</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSubscriptionPaymentData(prev => ({
                ...prev,
                selectedPlan: plan.id as any,
                amount: plan.price.toString()
              }))}
              className={`p-6 rounded-lg border-2 cursor-pointer ${
                subscriptionPaymentData.selectedPlan === plan.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold mb-4">KES {plan.price.toLocaleString()}/mo</p>
              <ul className="list-disc pl-5 mb-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {subscriptionPaymentData.selectedPlan && (
          <form onSubmit={handleSubscriptionPayment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  M-PESA Transaction Code
                </label>
                <input
                  type="text"
                  value={subscriptionPaymentData.transactionCode}
                  onChange={(e) => setSubscriptionPaymentData(prev => ({
                    ...prev,
                    transactionCode: e.target.value
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  M-PESA Phone Number
                </label>
                <input
                  type="tel"
                  value={subscriptionPaymentData.mpesaNumber}
                  onChange={(e) => setSubscriptionPaymentData(prev => ({
                    ...prev,
                    mpesaNumber: e.target.value
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  placeholder="07XXXXXXXX"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">
                  Selected Plan: {subscriptionPlans.find(p => p.id === subscriptionPaymentData.selectedPlan)?.name}
                </p>
                <p className="text-gray-600">
                  Amount: KES {subscriptionPaymentData.amount}
                </p>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Submit Payment Details
              </button>
            </div>
          </form>
        )}
      </div>

  {/* Transaction History */}

  
<div className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-xl font-bold mb-4">Payment History</h2>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="hidden sm:table-header-group">
        <tr className="text-left border-b">
          <th className="pb-2">Date</th>
          <th className="pb-2">Type</th>
          <th className="pb-2">Amount</th>
          <th className="pb-2">Transaction Code</th>
          <th className="pb-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr 
            key={transaction.id} 
            className="border-b block sm:table-row mb-4 sm:mb-0"
          >
            <td className="py-3 block sm:table-cell">
              <span className="font-medium sm:hidden mr-2">Date:</span>
              {transaction.date}
            </td>
            <td className="py-3 block sm:table-cell">
              <span className="font-medium sm:hidden mr-2">Type:</span>
              <span className="capitalize">{transaction.type}</span>
            </td>
            <td className="py-3 block sm:table-cell">
              <span className="font-medium sm:hidden mr-2">Amount:</span>
              KES {transaction.amount.toLocaleString()}
            </td>
            <td className="py-3 block sm:table-cell">
              <span className="font-medium sm:hidden mr-2">Code:</span>
              {transaction.transactionCode}
            </td>
            <td className="py-3 block sm:table-cell">
              <span className="font-medium sm:hidden mr-2">Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  transaction.status === 'verified'
                    ? 'bg-green-100 text-green-800'
                    : transaction.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {transaction.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
<Footer />
    </div>
  );
}