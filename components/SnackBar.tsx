import React, { useEffect } from "react";

interface SnackbarProps {
  message: string;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Snackbar disappears after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-[9999]">
      {message}
    </div>
  );
};

export default Snackbar;


