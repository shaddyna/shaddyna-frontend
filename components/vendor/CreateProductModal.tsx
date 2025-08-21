// components/vendor/CreateProductModal.tsx
/*'use client';

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
            {/*<FormInput name='Slug' id='slug' required />*
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
}*/

// components/vendor/CreateProductModal.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ValidationRule, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

export default function CreateProductModal({
  onClose,
  vendorId,
}: {
  onClose: () => void;
  vendorId: string;
}) {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Define all product categories and subcategories
  const productTypes = [
    {
      id: 'shoes',
      name: 'Shoes',
      subCategories: ['Official', 'Casual', 'Sports', 'Sandals', 'Boots', 'Slippers'],
    },
    {
      id: 'beauty',
      name: 'Beauty Products',
      subCategories: ['Skincare', 'Haircare', 'Makeup', 'Perfume', 'Grooming'],
    },
    {
      id: 'stationery',
      name: 'Stationery Items',
      subCategories: ['Pens', 'Books', 'Files', 'Notebooks', 'Markers'],
    },
    {
      id: 'electronics',
      name: 'Electronics',
      subCategories: ['Phones', 'Laptops', 'TVs', 'Audio', 'Kitchen Electronics'],
    },
    {
      id: 'appliances',
      name: 'Home Appliances',
      subCategories: ['Kitchen Appliances', 'Cleaning Appliances', 'Cooling/Heating'],
    },
  ];

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
    control,
  } = useForm<any>();

  // Watch for product type changes
  const selectedProductType = useWatch({
    control,
    name: 'productType',
  });

  useEffect(() => {
    // Reset subcategory when product type changes
    setValue('subCategory', '');
  }, [selectedProductType, setValue]);

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
    type = 'text',
    placeholder,
    className = 'input input-bordered w-full max-w-md',
  }: {
    id: string;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
    type?: string;
    placeholder?: string;
    className?: string;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className={className}
        />
        {/*{errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}*/}
      </div>
    </div>
  );

  const FormSelect = ({
    id,
    name,
    required,
    options,
    placeholder,
  }: {
    id: string;
    name: string;
    required?: boolean;
    options: string[] | { value: string; label: string }[];
    placeholder?: string;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <select
          id={id}
          {...register(id, { required: required && `${name} is required` })}
          className='select select-bordered w-full max-w-md'
          defaultValue=''
        >
          <option value='' disabled>{placeholder || `Select ${name}`}</option>
          {options.map((option) => {
            if (typeof option === 'string') {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            }
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        {/*{errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}*/}
      </div>
    </div>
  );

  const FormTextarea = ({
    id,
    name,
    required,
    placeholder,
    rows = 3,
  }: {
    id: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          {...register(id, {
            required: required && `${name} is required`,
          })}
          className='textarea textarea-bordered w-full max-w-md'
        />
        {/*{errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}*/}
      </div>
    </div>
  );

  // Render dynamic fields based on product type
  const renderDynamicFields = () => {
    switch (selectedProductType) {
      case 'shoes':
        return (
          <>
            <FormSelect
              id='subCategory'
              name='Sub-Category'
              required
              options={productTypes.find(t => t.id === 'shoes')?.subCategories || []}
            />
            <FormInput name='Size' id='size' required placeholder='EU 42 / US 9' />
            <FormInput name='Color' id='color' required />
            <FormSelect
              id='material'
              name='Material'
              required
              options={['Leather', 'Canvas', 'Synthetic', 'Rubber', 'Other']}
            />
            <FormSelect
              id='gender'
              name='Gender'
              required
              options={['Men', 'Women', 'Unisex', 'Kids']}
            />
            <FormSelect
              id='occasion'
              name='Occasion'
              required
              options={['Formal', 'Casual', 'Sports', 'Party', 'Other']}
            />
            <FormInput name='Heel Height' id='heelHeight' placeholder='e.g., 2 inches' />
            <FormSelect
              id='closureType'
              name='Closure Type'
              options={['Laces', 'Slip-On', 'Velcro', 'Buckle', 'Zipper', 'Other']}
            />
            <FormInput name='Warranty' id='warranty' placeholder='e.g., 6 months' />
          </>
        );
      
      case 'beauty':
        return (
          <>
            <FormSelect
              id='subCategory'
              name='Sub-Category'
              required
              options={productTypes.find(t => t.id === 'beauty')?.subCategories || []}
            />
            <FormInput name='Volume/Weight' id='volume' required placeholder='e.g., 100ml or 50g' />
            <FormSelect
              id='skinType'
              name='Skin Type'
              options={['Oily', 'Dry', 'Sensitive', 'Combination', 'All']}
            />
            <FormInput name='Shade/Color' id='shade' placeholder='For makeup products' />
            <FormTextarea
              id='ingredients'
              name='Key Ingredients'
              placeholder='List key ingredients separated by commas'
            />
            <FormSelect
              id='gender'
              name='Gender'
              options={['Men', 'Women', 'Unisex']}
            />
            <FormInput name='Expiry Date' id='expiryDate' type='date' />
            <FormInput name='Origin' id='origin' placeholder='Country of manufacture' />
            <FormInput name='Certification' id='certification' placeholder='e.g., Organic, Dermatologically Tested' />
          </>
        );
      
      case 'stationery':
        return (
          <>
            <FormSelect
              id='subCategory'
              name='Sub-Category'
              required
              options={productTypes.find(t => t.id === 'stationery')?.subCategories || []}
            />
            <FormSelect
              id='material'
              name='Material'
              options={['Paper', 'Plastic', 'Metal', 'Wood', 'Other']}
            />
            <FormInput name='Size/Dimensions' id='dimensions' placeholder='e.g., A4, A5, 10x15cm' />
            <FormInput name='Color' id='color' />
            <FormInput name='Page Count' id='pageCount' type='number' placeholder='For books/notebooks' />
            <FormSelect
              id='inkType'
              name='Ink Type'
              options={['Gel', 'Ballpoint', 'Fountain', 'Marker', 'Other']}
            />
            <FormInput name='Pack Quantity' id='packQty' type='number' placeholder='Number of items in pack' />
            <FormSelect
              id='usage'
              name='Usage'
              options={['Office', 'School', 'Art', 'Home', 'Other']}
            />
          </>
        );
      
      case 'electronics':
        return (
          <>
            <FormSelect
              id='subCategory'
              name='Sub-Category'
              required
              options={productTypes.find(t => t.id === 'electronics')?.subCategories || []}
            />
            <FormInput name='Model Number' id='modelNumber' required />
            <FormInput name='Color' id='color' />
            <FormInput name='Processor' id='processor' placeholder='For computers/phones' />
            <FormInput name='RAM' id='ram' placeholder='e.g., 8GB' />
            <FormInput name='Storage' id='storage' placeholder='e.g., 256GB SSD' />
            <FormInput name='Screen Size' id='screenSize' placeholder='e.g., 15.6 inches' />
            <FormInput name='Screen Resolution' id='resolution' placeholder='e.g., 1920x1080' />
            <FormInput name='Battery Capacity' id='battery' placeholder='e.g., 5000mAh' />
            <FormInput name='Connectivity' id='connectivity' placeholder='e.g., WiFi, Bluetooth, 5G' />
            <FormInput name='Warranty' id='warranty' placeholder='e.g., 1 year' />
            <FormInput name='Power Requirement' id='power' placeholder='e.g., 110-240V' />
            <FormInput name='Weight' id='weight' placeholder='e.g., 1.5kg' />
            <FormInput name='Dimensions' id='dimensions' placeholder='e.g., 30x20x5cm' />
            <FormTextarea
              id='accessories'
              name='Accessories Included'
              placeholder='List accessories separated by commas'
            />
          </>
        );
      
      case 'appliances':
        return (
          <>
            <FormSelect
              id='subCategory'
              name='Sub-Category'
              required
              options={productTypes.find(t => t.id === 'appliances')?.subCategories || []}
            />
            <FormInput name='Model Number' id='modelNumber' required />
            <FormInput name='Color' id='color' />
            <FormSelect
              id='material'
              name='Material'
              options={['Stainless Steel', 'Plastic', 'Glass', 'Aluminum', 'Other']}
            />
            <FormInput name='Power Requirement' id='power' placeholder='e.g., 220V, 1500W' />
            <FormInput name='Capacity' id='capacity' placeholder='e.g., 10L, 7kg' />
            <FormInput name='Dimensions' id='dimensions' placeholder='e.g., 60x60x85cm' />
            <FormInput name='Weight' id='weight' placeholder='e.g., 25kg' />
            <FormTextarea
              id='features'
              name='Features'
              placeholder='List features separated by commas'
            />
            <FormInput name='Warranty' id='warranty' placeholder='e.g., 2 years' />
            <FormInput name='Noise Level' id='noiseLevel' placeholder='e.g., 45dB' />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-5xl max-h-screen overflow-y-auto">
        <h3 className="font-bold text-lg">Create New Product</h3>
        <div className="py-4">
          <form onSubmit={handleSubmit(formSubmit)}>
            {/* Product Type Selection */}
            <div className='mb-6 md:flex'>
              <label className='label md:w-1/5' htmlFor='productType'>
                Product Type
              </label>
              <div className='md:w-4/5'>
                <select
                  id='productType'
                  {...register('productType', { required: 'Product type is required' })}
                  className='select select-bordered w-full max-w-md'
                  defaultValue=''
                >
                  <option value='' disabled>Select a product type</option>
                  {productTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
               {/*} {errors.productType?.message && (
                  <div className='text-error'>{errors.productType.message}</div>
                )}*/}
              </div>
            </div>

            {/* Common Fields */}
            <FormInput name='Name' id='name' required />
            <FormInput name='Brand' id='brand' required />
            <FormInput name='Price' id='price' required type='number' />
            <FormInput name='Count In Stock' id='countInStock' required type='number' />
            <FormTextarea name='Description' id='description' required />

            {/* Dynamic Fields Based on Product Type */}
            {selectedProductType && renderDynamicFields()}

            {/* Image Upload */}
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