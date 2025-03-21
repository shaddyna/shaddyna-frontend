/*'use client';  // Add this line to mark the component as a client-side component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Use 'next/navigation' instead of 'next/router'
import Back from '@/components/Back';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false); // Flag to check if we're on the client side
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set to true after the component has mounted on the client
  }, []);

  useEffect(() => {
    // Fetch the list of users (excluding the current logged-in user)
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://shaddyna-backend.onrender.com/api/users/all'); // Adjust the API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChatClick = (receiver: string) => {
    if (isClient) {
      router.push(`/chat/${receiver}`); // Navigate to the chat page of the selected user
    }
  };

  return (
    <div>
      <Back title={'Chats'} />
    <div className="p-4">
      
      <div className="space-y-4">
        {users.map(user => (
          <div key={user._id} className="flex justify-between items-center p-4 border-b">
            <span>{user.firstName} {user.lastName}</span>
            <button
              onClick={() => handleChatClick(user._id)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
<Footer />
<BottomNavigationBar />
    </div>
  );
};

export default UserList;*/

"use client"; // If using Next.js App Router
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  /*useEffect(() => {
    // Get userId from localStorage or auth state
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser.id);
    } else {
      router.push("/login"); // Redirect to login if no user
    }
  }, [router]);

  if (!userId) return <p>Loading...</p>;*/

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold mb-4">Chat</h1>
      <iframe
        src={`http://localhost:3001/users`}
        style={{ width: "100%", height: "500px", border: "none" }}
      ></iframe>
    </div>
  );
};

export default ChatPage;



