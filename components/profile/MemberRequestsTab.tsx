// components/profile/SellerRequestsTab.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AdminTable } from '@/components/profile/AdminTable';
import { User, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MemberRequest {
  _id: string;
  amount: number;
  paymentMethod: string;
  mpesaName?: string;
  mpesaCode?: string;
  status: 'pending' | 'approved' | 'rejected';
  processedAt?: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export const MemberRequestsTab = () => {
  const [requests, setRequests] = useState<MemberRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('https://shaddynab-new.onrender.com/api/members');
        setRequests(res.data);
      } catch (err) {
        setError('Failed to fetch seller requests');
        console.error('Error fetching seller requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await axios.put(`https://shaddynab-new.onrender.com/api/members/${id}`, { status });
      setRequests(prev =>
        prev.map(req =>
          req._id === id ? { ...req, status, processedAt: new Date().toISOString() } : req
        )
      );
    } catch (err) {
      console.error(`Failed to ${status} request:`, err);
      alert(`Failed to ${status} request`);
    }
  };

  const formattedData = requests.map(request => ({
    ...request,
    id: request._id,
    userId: request.userId,
    amount: request.amount,
    paymentMethod: request.paymentMethod,
    mpesaName: request.mpesaName,
    mpesaCode: request.mpesaCode,
    status: request.status,
    rawData: request,
  }));

  return (
    <AdminTable
      title="Seller Requests"
      columns={[
        {
          key: "userId",
          label: "User",
          render: (userId: any) => (
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={20} className="text-gray-500" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  {`${userId.firstName} ${userId.lastName}`}
                </div>
                <div className="text-sm text-gray-500">{userId.email}</div>
              </div>
            </div>
          ),
        },
        {
          key: "amount",
          label: "Amount",
          render: (amount: number) => (
            <div className="text-sm text-gray-600">KES {amount}</div>
          ),
        },
        {
          key: "paymentMethod",
          label: "Payment Method",
          render: (method: string) => (
            <div className="text-sm text-gray-600 capitalize">{method}</div>
          ),
        },
        {
          key: "mpesaName",
          label: "Mpesa Name",
          render: (name?: string) => (
            <div className="text-sm text-gray-600">{name || '-'}</div>
          ),
        },
        {
          key: "mpesaCode",
          label: "Mpesa Code",
          render: (code?: string) => (
            <div className="text-sm text-gray-600">{code || '-'}</div>
          ),
        },
        {
          key: "status",
          label: "Status",
          render: (status: string) => (
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {status}
            </span>
          ),
        },
      ]}
      data={formattedData}
      loading={loading}
      error={error}
      onAdd={() => {}}
      onEdit={() => {}}
      onDelete={() => {}}
      renderActions={(item: MemberRequest) => (
        <div className="flex gap-2">
          {item.status === 'pending' && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => handleStatusChange(item._id, 'approved')}
              >
                <Check className="mr-1 h-4 w-4" /> Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => handleStatusChange(item._id, 'rejected')}
              >
                <X className="mr-1 h-4 w-4" /> Reject
              </Button>
            </>
          )}
        </div>
      )}
    />
  );
};