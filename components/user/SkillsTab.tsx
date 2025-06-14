/*import React from 'react';
import { Skill } from '@/types/types';
import { GradientButton } from './GradientButton';

interface SkillsTabProps {
  skills: Skill[];
}

export const SkillsTab: React.FC<SkillsTabProps> = ({ skills }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Skills</h2>
        <p className="text-sm text-gray-500">Showcase your expertise</p>
      </div>
      <GradientButton>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span>Add Skill</span>
      </GradientButton>
    </div>
    
    <div className="space-y-4">
      {skills.map(skill => (
        <div key={skill.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">{skill.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{skill.category}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${i < skill.level ? 'bg-purple-600' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-500">{skill.level}/5</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
            <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
              Edit
            </button>
            <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
              Showcase
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);*/

import React, { useState, useEffect } from 'react';
import { Skill } from '@/types/types';
import { GradientButton } from './GradientButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface SkillsTabProps {
  userId?: string;
  isOwner?: boolean;
  initialSkills?: Skill[];
   token: string;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({ 
  userId, 
  isOwner = false,
  initialSkills = [] ,
  token
}) => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [loading, setLoading] = useState(!initialSkills.length);
  const [error, setError] = useState('');
  const router = useRouter();

useEffect(() => {
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:5000/api/skills/user/${userId}`,
        config
      );

      setSkills(response.data.data);
      toast.success('✅ Skills loaded successfully!');
      console.log('✅ Skills data:', response.data.data);
    } catch (err) {
      let message = '❌ Failed to load skills';
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      toast.error(message);
      console.error('❌ Error loading skills:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!initialSkills.length && userId && token) {
    fetchSkills();
  }
}, [userId, token]);

  const handleAddSkill = () => {
    router.push('/skills/new');
  };

  const handleEditSkill = (skillId: string) => {
    router.push(`/skills/${skillId}/edit`);
  };

  const handleShowcaseSkill = (skillId: string) => {
    router.push(`/skills/${skillId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) return <div className="text-center py-8">Loading skills...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!skills.length) return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900">No skills found</h3>
      <p className="text-gray-500 mt-1">Get started by adding your first skill</p>
      {isOwner && (
        <div className="mt-6">
          <GradientButton  className="px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add Skill</span>
          </GradientButton>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Skills</h2>
          <p className="text-sm text-gray-500">Showcase your expertise</p>
        </div>
        {isOwner && (
          <GradientButton >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add Skill</span>
          </GradientButton>
        )}
      </div>
      
      <div className="space-y-4">
        {skills.map(skill => (
          <div key={skill._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{skill.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{skill.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {skill.skills.slice(0, 3).map((s, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {s}
                    </span>
                  ))}
                  {skill.skills.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                      +{skill.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-purple-600 font-semibold">
                  {formatPrice(skill.price)}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Delivery: {skill.deliveryTime}
                </span>
                {skill.averageRating && (
                  <div className="flex items-center mt-2 space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(skill.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({skill.averageRating?.toFixed(1)})
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {isOwner && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button 
                  onClick={() => handleEditSkill(skill._id)}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleShowcaseSkill(skill._id)}
                  className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                >
                  Showcase
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};