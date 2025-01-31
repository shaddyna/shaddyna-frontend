"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";

const EditMemberPage = () => {
  const [member, setMember] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [id, setId] = useState<string | null>(null); // Store id separately

  useEffect(() => {
    // Using window.location to extract the id from the URL
    const path = window.location.pathname;
    const extractedId = path.split("/")[2]; // Assuming the URL is like '/edit-member/[id]'
    setId(extractedId);

    if (extractedId) {
      const fetchMember = async () => {
        try {
          const response = await axios.get(
            `https://shaddyna-backend.onrender.com/api/members/${extractedId}`
          );
          setMember(response.data);
        } catch (error) {
          console.error("Error fetching member:", error);
        }
      };
      fetchMember();
    }
  }, []); // Empty dependency array to run on initial load

  // Handle form submission to update member
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const updatedMember = await axios.put(
        `https://shaddyna-backend.onrender.com/api/members/${id}`,
        member
      );
      window.location.href = "/members"; // Redirect to the members list after successful update
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  // Handle input change
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
        <Back title={"Edit Member"} />
    <div className="bg-gray-50">
    <div className="max-w-4xl mx-auto p-3">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6">
        <h1 className="text-3xl font-semibold text-[#182155] mb-3 text-center">Member</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label className="block text-[#182155] font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={member.name}
                  onChange={handleChange}
                  className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182155] focus:border-[#182155]"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-[#182155] font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={member.email}
                  onChange={handleChange}
                  className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182155] focus:border-[#182155]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label className="block text-[#182155] font-medium mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={member.phoneNumber}
                  onChange={handleChange}
                  className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182155] focus:border-[#182155]"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-[#182155] font-medium mb-2">Role</label>
                <select
                  name="role"
                  value={member.role}
                  onChange={handleChange}
                  className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182155] focus:border-[#182155]"
                >
                  <option value="member">Member</option>
                  <option value="nonmember">Nonmember</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 text-white bg-[#182155] rounded-md hover:bg-[#1f2b61] focus:outline-none flex items-center"
              >
                <BsPencilSquare className="mr-2" />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    <BottomNavigationBar />
    <Footer />
    </div>
  );
};

export default EditMemberPage;
