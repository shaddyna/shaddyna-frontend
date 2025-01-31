/*"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Update this line
import { BsPencilSquare, BsTrash } from 'react-icons/bs'; 
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";

// Define the type for a member
interface Member {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const MembersListPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const router = useRouter(); // This is now correctly imported from next/navigation

  // Fetch all members from the backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("https://shaddyna-backend.onrender.com/api/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Handle delete member
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://shaddyna-backend.onrender.com/api/members/${id}`);
      // Refresh the members list after deletion
      setMembers(members.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // Handle edit member (redirect to edit page)
  const handleEdit = (id: string) => {
    router.push(`/edit-member/${id}`);
  };

  return (
    <div>
        <Back title={"Members List"} />
    <div className="bg-gray-50">
     <div className="max-w-4xl mx-auto p-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.length === 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center text-gray-700">
            No members found.
          </div>
        ) : (
          members.map((member) => (
            <div key={member._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="p-3">
                <p className="text-xl font-semibold mb-2 text-[#182155]">{member.name}</p>
                <p className="text-gray-600 mb-2">{member.email}</p>
                <p className="text-gray-600 mb-2">{member.phoneNumber}</p>
                <p className="text-gray-600 mb-4">{member.role}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
    <BottomNavigationBar />
    <Footer />
    </div>
  );
};

export default MembersListPage;*/

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";

// Define the type for a member
interface Member {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const MembersListPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const router = useRouter();

  // Fetch all members from the backend and filter only 'member' role
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("https://shaddyna-backend.onrender.com/api/members");
        const filteredMembers = response.data.filter((member: Member) => member.role === "member");
        setMembers(filteredMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <Back title={"Members List"} />
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {members.length === 0 ? (
              <div className="bg-white shadow-lg rounded-lg p-6 text-center text-gray-700">
                No members found.
              </div>
            ) : (
              members.map((member) => (
                <div
                  key={member._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="p-3">
                    <p className="text-xl font-semibold mb-2 text-[#182155]">{member.name}</p>
                    <p className="text-gray-600 mb-2">{member.email}</p>
                    <p className="text-gray-600 mb-2">{member.phoneNumber}</p>
                    <p className="text-gray-600 mb-4">{member.role}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default MembersListPage;

