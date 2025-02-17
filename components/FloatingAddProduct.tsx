/*'use client';
import React from 'react';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const FloatingButtonAdd = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/add-product-shelf`)}
      className="bg-[#ff199c] text-white p-4 rounded-full fixed bottom-24 right-6 shadow-lg"
    >
      <FaPlusCircle className="text-xl" />
    </button>
  );
};

export default FloatingButtonAdd;*/

"use client";

import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface FloatingButtonAddProps {
  shelfId?: string;
}

const FloatingButtonAdd: React.FC<FloatingButtonAddProps> = ({ shelfId }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (shelfId) {
          router.push(`/add-product-shelf/${shelfId}`);
        }
      }}
      className="bg-[#ff199c] text-white p-4 rounded-full fixed bottom-24 right-6 shadow-lg"
    >
      <FaPlusCircle className="text-xl" />
    </button>
  );
};

export default FloatingButtonAdd;
