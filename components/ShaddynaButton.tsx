import { FC } from "react";
import Link from "next/link";

interface ShaddynaButtonProps {
  loading?: boolean;
}

const ShaddynaButton: FC<ShaddynaButtonProps> = ({ loading }) => {
  return (
    <Link href="">
      <button
        className="w-full pt-2 px-6 py-2 border-2 border-[#182155] font-bold text-white bg-[#ff199c] hover:bg-[#182155] rounded transition lg:hidden"
        disabled={loading}
      >
        {loading ? "Loading..." : "Shaddyna Hub"}
      </button>
    </Link>
  );
};

export default ShaddynaButton;



