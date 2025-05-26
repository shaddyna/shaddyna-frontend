"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiX, FiCheck, FiTag, FiClock, FiUser, FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface CreateShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: "fashion", name: "Fashion" },
  { id: "home", name: "Home Decor" },
  { id: "art", name: "Art" },
  { id: "jewelry", name: "Jewelry" },
  { id: "beauty", name: "Beauty" },
  { id: "electronics", name: "Electronics" },
  { id: "food", name: "Food & Beverage" },
  { id: "other", name: "Other" },
];

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", 
  "Friday", "Saturday", "Sunday"
];

type WorkingHour = {
  open: string;
  close: string;
  closed: boolean;
};

type WorkingHours = {
  [day in (typeof daysOfWeek)[number]]: WorkingHour;
};

const CreateShopModal = ({ isOpen, onClose }: CreateShopModalProps) => {
  const { token } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    location: "",
    description: "",
    email: "",
    phone: "",
    instagram: "",
    facebook: "",
    twitter: "",
    returnPolicy: "",
    shippingPolicy: ""
  });
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState<WorkingHours>(
    daysOfWeek.reduce((acc, day) => ({
      ...acc,
      [day]: { open: "09:00", close: "17:00", closed: false }
    }), {} as WorkingHours)
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

interface HandleImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const handleImageChange = (e: HandleImageChangeEvent) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string" || reader.result === null) {
                setPreviewImage(reader.result);
            }
        };
        reader.readAsDataURL(file);
    }
};

interface HandleWorkingHoursChangeFn {
    (day: string, field: keyof WorkingHour, value: string): void;
}

const handleWorkingHoursChange: HandleWorkingHoursChangeFn = (day, field, value) => {
    setWorkingHours((prev: WorkingHours) => ({
        ...prev,
        [day]: {
            ...prev[day],
            [field]: value
        }
    }));
};

interface ToggleDayClosedFn {
    (day: string): void;
}

const toggleDayClosed: ToggleDayClosedFn = (day) => {
    setWorkingHours((prev: WorkingHours) => ({
        ...prev,
        [day]: {
            ...prev[day],
            closed: !prev[day].closed
        }
    }));
};

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};

interface ShopFormData {
    shopName: string;
    ownerName: string;
    location: string;
    description: string;
    email: string;
    phone: string;
    instagram: string;
    facebook: string;
    twitter: string;
    returnPolicy: string;
    shippingPolicy: string;
}

interface ShopData extends ShopFormData {
    categories: string[];
    workingHours: WorkingHours;
    // image: File | null; // image would be uploaded separately in a real implementation
}

/*const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
        const shopData: ShopData = {
            ...formData,
            categories: selectedCategories,
            workingHours,
            // image would be uploaded separately in a real implementation
        };
        
        console.log("Creating shop with:", shopData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        onClose();
    } catch (err) {
        setError("Failed to create shop. Please try again.");
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
};*/

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      if (selectedCategories.length === 0) {
        throw new Error("Please select at least one category");
      }
      
      if (!previewImage) {
        throw new Error("Please upload a shop image");
      }

      // Prepare form data
      const shopForm = new FormData();
      shopForm.append('name', formData.shopName);
      shopForm.append('description', formData.description);
      shopForm.append('location', formData.location);
      selectedCategories.forEach(cat => shopForm.append('categories[]', cat));
      shopForm.append('workingHours', JSON.stringify(workingHours));
      shopForm.append('email', formData.email);
      shopForm.append('phone', formData.phone);
      shopForm.append('instagram', formData.instagram);
      shopForm.append('facebook', formData.facebook);
      shopForm.append('twitter', formData.twitter);
      shopForm.append('returnPolicy', formData.returnPolicy);
      shopForm.append('shippingPolicy', formData.shippingPolicy);
      
      // Get the actual file from the input
      if (fileInputRef.current?.files?.[0]) {
        shopForm.append('image', fileInputRef.current.files[0]);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: shopForm
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shop');
      }

      const data = await response.json();
      
      // Show success message and close modal
      toast.success('Shop created successfully!');
      onClose();
      router.refresh(); // Refresh the page to show the new shop
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create shop. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 mx-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#0f1c47]/10"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#bf2c7e]/10"></div>

        {/* Close button *
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <FiX className="w-5 h-5 text-gray-500" />
        </button>*/}

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#0f1c47] to-[#1a3a8f] rounded-full mb-6">
              <FiTag className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create Your Shop
            </h2>
            <p className="text-gray-500">
              Set up your shop and start selling today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shop Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shop Name *
                </label>
                <div className="relative">
                  <input
                    name="shopName"
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                    placeholder="Luxe Boutique"
                    value={formData.shopName}
                    onChange={handleInputChange}
                    required
                  />
                  <FiTag className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Owner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Name *
                </label>
                <div className="relative">
                  <input
                    name="ownerName"
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                  />
                  <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <div className="relative">
                  <input
                    name="location"
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                  <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shop Image
                </label>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-24 h-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-sm">Upload</span>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <div className="text-sm text-gray-500">
                    Recommended size: 800x800px. JPG, PNG (max 5MB)
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories (Select up to 3) *
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                        selectedCategories.includes(category.id)
                          ? "bg-[#0f1c47] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      disabled={
                        selectedCategories.length >= 3 && 
                        !selectedCategories.includes(category.id)
                      }
                    >
                      {selectedCategories.includes(category.id) && (
                        <FiCheck className="w-4 h-4" />
                      )}
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                  rows={4}
                  placeholder="Tell us about your shop..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FiMail className="text-[#0f1c47]" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input
                      name="phone"
                      type="tel"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input
                      name="instagram"
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                      placeholder="Instagram handle"
                      value={formData.instagram}
                      onChange={handleInputChange}
                    />
                    <FiInstagram className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input
                      name="facebook"
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                      placeholder="Facebook page"
                      value={formData.facebook}
                      onChange={handleInputChange}
                    />
                    <FiFacebook className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input
                      name="twitter"
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                      placeholder="Twitter handle"
                      value={formData.twitter}
                      onChange={handleInputChange}
                    />
                    <FiTwitter className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FiClock className="text-[#0f1c47]" />
                  Working Hours
                </h3>
                <div className="space-y-3">
                  {daysOfWeek.map(day => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-24">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!workingHours[day].closed}
                            onChange={() => toggleDayClosed(day)}
                            className="rounded border-gray-300 text-[#0f1c47] focus:ring-[#0f1c47]"
                          />
                          <span className={workingHours[day].closed ? "text-gray-400" : ""}>
                            {day}
                          </span>
                        </label>
                      </div>
                      {!workingHours[day].closed && (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="time"
                            value={workingHours[day].open}
                            onChange={(e) => handleWorkingHoursChange(day, 'open', e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={workingHours[day].close}
                            onChange={(e) => handleWorkingHoursChange(day, 'close', e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Shop Policies
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return Policy
                    </label>
                    <textarea
                      name="returnPolicy"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                      rows={3}
                      placeholder="Describe your return policy..."
                      value={formData.returnPolicy}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Policy
                    </label>
                    <textarea
                      name="shippingPolicy"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                      rows={3}
                      placeholder="Describe your shipping policy..."
                      value={formData.shippingPolicy}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || selectedCategories.length === 0}
                className={`w-full px-6 py-3.5 bg-gradient-to-r from-[#0f1c47] to-[#1a3a8f] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                  (isSubmitting || selectedCategories.length === 0) ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Shop...
                  </span>
                ) : (
                  "Create Shop"
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateShopModal;