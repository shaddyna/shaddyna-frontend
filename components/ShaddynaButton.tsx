/*"use client"
import { FC } from "react";
import { useRouter } from "next/navigation"; // Using correct import

interface ShaddynaButtonProps {
  loading?: boolean;
}

const ShaddynaButton: FC<ShaddynaButtonProps> = ({ loading }) => {
  const router = useRouter(); // Correct router hook import

  const handleClick = () => {
    router.push("/member-payment"); // Handle navigation on click
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

export default ShaddynaButton;*/


"use client"
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserSellerStore } from "@/store/useUserSellerStore"; // Import your Zustand store

interface ShaddynaButtonProps {
  loading?: boolean;
}

const ShaddynaButton: FC<ShaddynaButtonProps> = ({ loading }) => {
  const [members, setMembers] = useState<any[]>([]); // Store members
  const { user, fetchCurrentUser } = useUserSellerStore(); // Access user and fetchCurrentUser from Zustand store
  const router = useRouter(); // Correct router hook import

  // Fetch members and current user info
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/members", {
          method: "GET", // Explicitly specifying GET method (though it's optional here)
        });
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };    

    // Fetch the current user if not already fetched
    if (!user) {
      fetchCurrentUser();
    }

    fetchMembers();
  }, [user, fetchCurrentUser]);

  const handleClick = () => {
    // Ensure user is fetched and available before proceeding
    if (!user) {
      console.error("User is not available");
      return;
    }

    // Check if the user exists among the members and redirect based on the role
    const member = members.find(m => m.user._id === user._id); // Match the user by ID

    if (member) {
      if (member.role === 'member') {
        router.push("/shaddyna"); // Redirect to /shaddyna if the user is a 'member'
      } else if (member.role === 'nonmember') {
        router.push("/success"); // Redirect to /success if the user is a 'nonmember'
      }
    } else {
      router.push("/member-payment"); // Redirect to /member-payment if the user is not in members
    }
  };

  return (
    <button
      className="w-full pt-2 px-6 py-2 font-bold text-white bg-[#ff199c] hover:bg-[#182155] rounded transition lg:hidden"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Loading..." : "Shaddyna Hub"}
    </button>
  );
};

export default ShaddynaButton;
