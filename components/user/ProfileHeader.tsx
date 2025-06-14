'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // Or any icon you prefer

interface ProfileHeaderProps {
  name: string;
  title: string;
  subtitle: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, title, subtitle }) => {
  const router = useRouter();

  return (
    <header className="mb-4">
      <div className="flex items-center gap-4 mb-2">
        <button
          onClick={() => router.back()}
          className="p-0 rounded-full hover:bg-gray-200 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      <p className="text-gray-500">{subtitle.replace('{name}', name.split(' ')[0])}</p>
    </header>
  );
};
