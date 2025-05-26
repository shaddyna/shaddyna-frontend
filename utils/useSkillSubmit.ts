'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import skillService from '@/services/skillService';

interface FormData {
  // Replace with actual form fields and types
  [key: string]: any;
}

const useSkillSubmit = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submitSkill = async (formData: FormData, token: string): Promise<any | void> => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await skillService.createSkill(formData, token);
      toast.success('Skill created successfully!');
      router.push('/skills');
      return data;
    } catch (err: any) {
      let errorMessage = 'Something went wrong';
      if (err?.response?.data?.errors) {
        errorMessage = err.response.data.errors.map((e: { msg: string }) => e.msg).join(', ');
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitSkill, isLoading, error };
};

export default useSkillSubmit;
