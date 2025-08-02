// components/vendor/CreateProductModal.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import { Product } from '@/lib/models/ProductModel';

export default function CreateProductModal({
  onClose,
  vendorId,
}: {
  onClose: () => void;
  vendorId: string;
}) {
  const router = useRouter();
  const categories = ['Shirt', 'Pants', 'Handbags'];
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/vendor/products`,
    async (url, { arg }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Product created successfully');
      router.push(`/vendor/products/${data.product._id}`);
      onClose();
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (selectedFiles.length + files.length > 5) {
        toast.error('You can upload a maximum of 5 images');
        return;
      }
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const uploadImages = async (): Promise<string[]> => {
  if (selectedFiles.length === 0) {
    toast.error('Please select at least one image');
    throw new Error('No images selected');
  }

  const uploadedUrls: string[] = [];
  const toastId = toast.loading('Uploading images...');
  setIsUploading(true);

  try {
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);
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
      uploadedUrls.push(data.secure_url);
    }

    toast.success('Images uploaded successfully', { id: toastId });
    return uploadedUrls;
  } catch (err: any) {
    toast.error(err.message || 'Failed to upload images', { id: toastId });
    throw err;
  } finally {
    setIsUploading(false);
  }
};
const generateSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();


  const formSubmit = async (formData: any) => {
    try {
      const imageUrls = await uploadImages();
      const slug = generateSlug(formData.name);
      await createProduct({ 
        ...formData, 
        slug,
        images: imageUrls,
        image: imageUrls[0], // First image as the main image
        vendor: vendorId 
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <input
          type='text'
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className='input input-bordered w-full max-w-md'
        />
        {errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-5xl">
        <h3 className="font-bold text-lg">Create New Product</h3>
        <div className="py-4">
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput name='Name' id='name' required />
            {/*<FormInput name='Slug' id='slug' required />*/}
            <FormInput name='Price' id='price' required />
            
            <div className='mb-6 md:flex'>
              <label className='label md:w-1/5' htmlFor='category'>
                Category
              </label>
              <div className='md:w-4/5'>
                <select
                  id='category'
                  {...register('category', { required: 'Category is required' })}
                  className='select select-bordered w-full max-w-md'
                  defaultValue=''
                >
                  <option value='' disabled>Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category?.message && (
                  <div className='text-error'>{errors.category.message}</div>
                )}
              </div>
            </div>
            
            <FormInput name='Brand' id='brand' required />
            <FormInput name='Description' id='description' required />
            <FormInput name='Count In Stock' id='countInStock' required />
            <div className='mb-6 md:flex'>
              <label className='label md:w-1/5' htmlFor='images'>
                Product Images (max 5)
              </label>
              <div className='md:w-4/5'>
                <input
                  type='file'
                  className='file-input w-full max-w-md'
                  id='images'
                  onChange={handleFileChange}
                  multiple
                  accept='image/*'
                />
                
                <div className="mt-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <span>{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)}
                        className="btn btn-xs btn-error"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button
                type='submit'
                disabled={isCreating || isUploading}
                className='btn btn-primary'
              >
                {(isCreating || isUploading) && (
                  <span className='loading loading-spinner'></span>
                )}
                Create
              </button>
              <button 
                type="button" 
                onClick={onClose} 
                className="btn"
                disabled={isCreating || isUploading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}