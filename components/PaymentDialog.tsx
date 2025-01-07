import React from 'react';

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

export default PaymentDialog;

