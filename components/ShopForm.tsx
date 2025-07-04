/*'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Shop, ShopCategory } from '@/lib/models/ShopModel';
import toast from 'react-hot-toast';

const categories: ShopCategory[] = [
  'fashion',
  'home',
  'art',
  'jewelry',
  'beauty',
  'electronics',
  'food',
  'other',
];

export default function ShopForm({ initialData }: { initialData: Shop | null }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    categories: [] as ShopCategory[],
    image: '',
    contact: {
      email: '',
      phone: '',
    },
    isActive: true,
    paymentDetails: {
      method: 'till' as 'till' | 'paybill',
      number: '',
      accountName: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        location: initialData.location,
        categories: initialData.categories,
        image: initialData.image,
        contact: {
          email: initialData.contact.email,
          phone: initialData.contact.phone || '',
        },
        isActive: initialData.isActive,
        paymentDetails: {
          method: initialData.paymentDetails?.method || 'till',
          number: initialData.paymentDetails?.number || '',
          accountName: initialData.paymentDetails?.accountName || '',
        },
      });
    } else if (session?.user?.email) {
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          email: session.user.email ?? '',
        },
      }));
    }
  }, [initialData, session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!selectedFile) {
      toast.error('Please select an image');
      throw new Error('No image selected');
    }

    const toastId = toast.loading('Uploading image...');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error?.message || 'Image upload failed');
      }

      const data = await res.json();
      toast.success('Image uploaded successfully', { id: toastId });
      return data.secure_url;
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload image', { id: toastId });
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value,
        },
      }));
    } else if (name.includes('paymentDetails.')) {
      const paymentField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        paymentDetails: {
          ...prev.paymentDetails,
          [paymentField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (category: ShopCategory) => {
    setFormData(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return {
        ...prev,
        categories: newCategories,
      };
    });
  };

  const handlePaymentMethodChange = (method: 'till' | 'paybill') => {
    setFormData(prev => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        method,
        accountName: method === 'till' ? '' : prev.paymentDetails.accountName,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Upload image if a new file was selected
      let imageUrl = formData.image;
      if (selectedFile) {
        imageUrl = await uploadImage();
      }

      const method = initialData ? 'PUT' : 'POST';
      const response = await fetch('/api/vendor/shop', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      router.refresh();
      toast.success(initialData ? 'Shop updated successfully' : 'Shop created successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Error saving shop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Shop Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
          maxLength={500}
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categories</label>
        <div className="mt-2 space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={formData.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={`category-${category}`} className="ml-2 block text-sm text-gray-700">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Shop Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          accept="image/*"
        />
        {selectedFile && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>
          </div>
        )}
        {formData.image && !selectedFile && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Current image</p>
            <img 
              src={formData.image} 
              alt="Current shop" 
              className="h-20 w-20 object-cover rounded"
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="contact.email" className="block text-sm font-medium text-gray-700">
          Contact Email
        </label>
        <input
          type="email"
          id="contact.email"
          name="contact.email"
          value={formData.contact.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="contact.phone" className="block text-sm font-medium text-gray-700">
          Contact Phone (Optional)
        </label>
        <input
          type="tel"
          id="contact.phone"
          name="contact.phone"
          value={formData.contact.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
          Shop is active
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                checked={formData.paymentDetails.method === 'till'}
                onChange={() => handlePaymentMethodChange('till')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Till Number</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                checked={formData.paymentDetails.method === 'paybill'}
                onChange={() => handlePaymentMethodChange('paybill')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Paybill</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="paymentDetails.number" className="block text-sm font-medium text-gray-700">
            {formData.paymentDetails.method === 'till' ? 'Till Number' : 'Paybill Number'}
          </label>
          <input
            type="text"
            id="paymentDetails.number"
            name="paymentDetails.number"
            value={formData.paymentDetails.number}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        {formData.paymentDetails.method === 'paybill' && (
          <div>
            <label htmlFor="paymentDetails.accountName" className="block text-sm font-medium text-gray-700">
              Business/Account Name
            </label>
            <input
              type="text"
              id="paymentDetails.accountName"
              name="paymentDetails.accountName"
              value={formData.paymentDetails.accountName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading || isUploading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {(loading || isUploading) && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {loading || isUploading ? 'Saving...' : initialData ? 'Update Shop' : 'Create Shop'}
        </button>
      </div>
    </form>
  );
}*/

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Shop, ShopCategory } from '@/lib/models/ShopModel';
import toast from 'react-hot-toast';

const categories: ShopCategory[] = [
  'fashion',
  'home',
  'art',
  'jewelry',
  'beauty',
  'electronics',
  'food',
  'other',
];

export default function ShopForm({ initialData }: { initialData: Shop | null }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    categories: [] as ShopCategory[],
    image: '',
    contact: {
      email: '',
      phone: '',
    },
    isActive: true,
    paymentDetails: {
      method: 'till' as 'till' | 'paybill',
      number: '',
      accountName: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        location: initialData.location,
        categories: initialData.categories,
        image: initialData.image,
        contact: {
          email: initialData.contact.email,
          phone: initialData.contact.phone || '',
        },
        isActive: initialData.isActive,
        paymentDetails: {
          method: initialData.paymentDetails?.method || 'till',
          number: initialData.paymentDetails?.number || '',
          accountName: initialData.paymentDetails?.accountName || '',
        },
      });
    } else if (session?.user?.email) {
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          email: session.user.email ?? '',
        },
      }));
    }
  }, [initialData, session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!selectedFile) {
      toast.error('Please select an image');
      throw new Error('No image selected');
    }

    const toastId = toast.loading('Uploading image...');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error?.message || 'Image upload failed');
      }

      const data = await res.json();
      toast.success('Image uploaded successfully', { id: toastId });
      return data.secure_url;
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload image', { id: toastId });
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value,
        },
      }));
    } else if (name.includes('paymentDetails.')) {
      const paymentField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        paymentDetails: {
          ...prev.paymentDetails,
          [paymentField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (category: ShopCategory) => {
    setFormData(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return {
        ...prev,
        categories: newCategories,
      };
    });
  };

  const handlePaymentMethodChange = (method: 'till' | 'paybill') => {
    setFormData(prev => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        method,
        accountName: method === 'till' ? '' : prev.paymentDetails.accountName,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = formData.image;
      if (selectedFile) {
        imageUrl = await uploadImage();
      }

      const method = initialData ? 'PUT' : 'POST';
      const response = await fetch('/api/vendor/shop', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      router.refresh();
      toast.success(initialData ? 'Shop updated successfully' : 'Shop created successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Error saving shop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {initialData ? 'Edit Shop Details' : 'Create New Shop'}
      </h2>
      
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Shop Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition duration-200"
                required
                maxLength={100}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition duration-200"
                required
                maxLength={500}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categories *</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 capitalize">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Shop Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-sm text-gray-500">
                      {selectedFile ? selectedFile.name : 'Click to upload'}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    id="image" 
                    name="image" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*" 
                  />
                </label>
                {formData.image && !selectedFile && (
                  <div className="relative">
                    <img 
                      src={formData.image} 
                      alt="Current shop" 
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="contact.email" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                id="contact.email"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="contact.phone" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                id="contact.phone"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition duration-200"
              />
            </div>

            <div className="pt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Shop is active
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentDetails.method === 'till'}
                    onChange={() => handlePaymentMethodChange('till')}
                    className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Till Number</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentDetails.method === 'paybill'}
                    onChange={() => handlePaymentMethodChange('paybill')}
                    className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Paybill</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="paymentDetails.number" className="block text-sm font-medium text-gray-700 mb-1">
                {formData.paymentDetails.method === 'till' ? 'Till Number *' : 'Paybill Number *'}
              </label>
              <input
                type="text"
                id="paymentDetails.number"
                name="paymentDetails.number"
                value={formData.paymentDetails.number}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition duration-200"
                required
              />
            </div>

            {formData.paymentDetails.method === 'paybill' && (
              <div>
                <label htmlFor="paymentDetails.accountName" className="block text-sm font-medium text-gray-700 mb-1">
                  Business/Account Name *
                </label>
                <input
                  type="text"
                  id="paymentDetails.accountName"
                  name="paymentDetails.accountName"
                  value={formData.paymentDetails.accountName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition duration-200"
                  required
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || isUploading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-[#bf2c7e] to-[#d85b9a] hover:from-[#a8246a] hover:to-[#bf2c7e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bf2c7e] disabled:opacity-70 transition-all duration-200"
          >
            {(loading || isUploading) && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading || isUploading 
              ? 'Processing...' 
              : initialData 
                ? 'Update Shop' 
                : 'Create Shop'}
          </button>
        </div>
      </form>
    </div>
  );
}