'use client';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const FloatingButton = ({ shelf }: { shelf: { id: string } }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/edit-shelf/${shelf.id}`)}
      className="bg-[#ff199c] text-white p-4 rounded-full fixed bottom-24 right-6 shadow-lg"
    >
      <FaEdit className="text-xl" />
    </button>
  );
};

export default FloatingButton;
