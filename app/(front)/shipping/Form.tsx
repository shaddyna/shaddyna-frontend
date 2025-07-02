/*'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, ValidationRule, useForm } from 'react-hook-form';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';
import  ShippingAddress  from '@/lib/models/OrderModel';

type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};


const Form = () => {
  const router = useRouter();
  const { saveShippingAddress, shippingAddress } = useCartService();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddress(form);
    router.push('/payment');
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-2'>
      <label className='label' htmlFor={id}>
        {name}
      </label>
      <input
        type='text'
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className='input input-bordered w-full max-w-sm'
      />
      {errors[id]?.message && (
        <div className='text-error'>{errors[id]?.message}</div>
      )}
    </div>
  );

  return (
    <div>
      <CheckoutSteps current={1} />
      <div className='card mx-auto my-4 max-w-sm bg-base-300'>
        <div className='card-body'>
          <h1 className='card-title'>Shipping Address</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput name='Full Name' id='fullName' required />
            <FormInput name='Address' id='address' required />
            <FormInput name='City' id='city' required />
            <FormInput name='Postal Code' id='postalCode' required />
            <FormInput name='Country' id='country' required />
            <div className='my-2'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-primary w-full'
              >
                {isSubmitting && <span className='loading loading-spinner' />}
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;*/

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, ValidationRule, useForm } from 'react-hook-form';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';
import ShippingAddress from '@/lib/models/OrderModel';

type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

const Form = () => {
  const router = useRouter();
  const { saveShippingAddress, shippingAddress } = useCartService();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddress(form);
    router.push('/payment');
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor={id}>
        {name}
      </label>
      <input
        type='text'
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition-colors ${
          errors[id]
            ? 'border-rose-500 focus:ring-rose-300 focus:border-rose-500'
            : 'border-gray-300 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]'
        }`}
      />
      {errors[id]?.message && (
        <div className='text-rose-500 text-xs mt-1'>{errors[id]?.message}</div>
      )}
    </div>
  );

  return (
    <div className='min-h-screen bg-white py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <CheckoutSteps current={1} />
        
        <div className='mt-8 bg-white rounded-xl shadow-lg overflow-hidden max-w-md mx-auto'>
          <div className='bg-[#bf2c7e] p-6'>
            <h1 className='text-2xl font-bold text-white'>Shipping Address</h1>
          </div>
          
          <div className='p-6'>
            <form onSubmit={handleSubmit(formSubmit)}>
              <FormInput name='Full Name' id='fullName' required />
              <FormInput name='Address' id='address' required />
              <FormInput name='City' id='city' required />
              <FormInput name='Postal Code' id='postalCode' required />
              <FormInput name='Country' id='country' required />
              
              <div className='mt-6'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full bg-[#bf2c7e] hover:bg-[#a8246e] text-white font-medium py-3 px-4 rounded-lg transition-colors ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className='flex items-center justify-center'>
                      <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Next'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
