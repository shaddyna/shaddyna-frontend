/*import React from 'react';

interface PaymentDialogProps {
  onClose: () => void; // Function type for the onClose prop
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ onClose }) => {
  const handlePayment = () => {
    // Handle the payment logic here
    alert('Initial payment processed!');
    onClose(); // Close the dialog after payment
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Become a Seller</h2>
        <p>To sell your products, make the initial payment to get started.</p>
        <button onClick={handlePayment} className="btn-primary">
          Make Payment
        </button>
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>
      </div>
      <style jsx>{`
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dialog {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        .btn-primary {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          margin: 10px;
        }
        .btn-secondary {
          background-color: #eaeaea;
          color: black;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          margin: 10px;
        }
      `}</style>
    </div>
  );
};

export default PaymentDialog;*/

import React from 'react';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePayment = () => {
    // Handle the payment logic here
    alert('Initial payment processed!');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Become a Seller</h2>
        <p className="mb-4">To sell your products, make the initial payment to get started.</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Make Payment
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDialog;

