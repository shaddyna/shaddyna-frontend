"use client"
import { FC } from "react";
import { useRouter } from "next/navigation"; // Using correct import

interface ShaddynaButtonProps {
  loading?: boolean;
}

const ShaddynaButton: FC<ShaddynaButtonProps> = ({ loading }) => {
  const router = useRouter(); // Correct router hook import

  const handleClick = () => {
    router.push("/shaddyna"); // Handle navigation on click
  };

  return (
    <button
      className="w-full pt-2 px-6 py-2 border-2 border-[#182155] font-bold text-white bg-[#ff199c] hover:bg-[#182155] rounded transition lg:hidden"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Loading..." : "Shaddyna Hub"}
    </button>
  );
};

export default ShaddynaButton;




