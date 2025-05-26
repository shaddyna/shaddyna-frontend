"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiX, FiCheck, FiTag, FiClock, FiDollarSign, FiList, FiImage } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: "design", name: "Design" },
  { id: "development", name: "Development" },
  { id: "marketing", name: "Marketing" },
  { id: "writing", name: "Writing" },
  { id: "video", name: "Video Production" },
  { id: "music", name: "Music & Audio" },
  { id: "business", name: "Business" },
  { id: "other", name: "Other" },
];

const skills = [
  { id: "web-design", name: "Web Design" },
  { id: "graphic-design", name: "Graphic Design" },
  { id: "ui-ux", name: "UI/UX" },
  { id: "frontend", name: "Frontend Development" },
  { id: "backend", name: "Backend Development" },
  { id: "fullstack", name: "Fullstack Development" },
  { id: "seo", name: "SEO" },
  { id: "social-media", name: "Social Media Marketing" },
  { id: "content-writing", name: "Content Writing" },
  { id: "copywriting", name: "Copywriting" },
  { id: "video-editing", name: "Video Editing" },
  { id: "animation", name: "Animation" },
  { id: "voice-over", name: "Voice Over" },
  { id: "business-plan", name: "Business Planning" },
  { id: "financial-advice", name: "Financial Advice" },
];

const deliveryTimes = [
  { id: "24h", name: "24 Hours" },
  { id: "3d", name: "3 Days" },
  { id: "1w", name: "1 Week" },
  { id: "2w", name: "2 Weeks" },
  { id: "1m", name: "1 Month" },
  { id: "custom", name: "Custom" },
];

interface ImageFile {
  file: File;
  preview: string;
}

interface InclusionItem {
  id: string;
  value: string;
}

const CreateHubModal = ({ isOpen, onClose }: CreateHubModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    deliveryTime: "",
    description: "",
    about: "",
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [inclusions, setInclusions] = useState<InclusionItem[]>([]);
  const [newInclusion, setNewInclusion] = useState("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { token } = useAuth();
  const router = useRouter();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3 - images.length);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setImages(prev => [...prev, { file, preview: reader.result as string }]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setInclusions(prev => [...prev, { id: Date.now().toString(), value: newInclusion }]);
      setNewInclusion("");
    }
  };

  const removeInclusion = (id: string) => {
    setInclusions(prev => prev.filter(item => item.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /*const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      if (!selectedCategory) {
        throw new Error("Please select a category");
      }
      
      if (selectedSkills.length === 0) {
        throw new Error("Please select at least one skill");
      }
      
      if (images.length === 0) {
        throw new Error("Please upload at least one image");
      }
      
      const hubData = {
        ...formData,
        category: selectedCategory,
        skills: selectedSkills,
        inclusions: inclusions.map(item => item.value),
        // In a real implementation, you would upload the images separately
      };
      
      console.log("Creating hub with:", hubData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create hub. Please try again.");
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
      if (!selectedCategory) {
        throw new Error("Please select a category");
      }
      
      if (selectedSkills.length === 0) {
        throw new Error("Please select at least one skill");
      }
      
      if (images.length === 0) {
        throw new Error("Please upload at least one image");
      }

      // Prepare form data
      const form = new FormData();
      form.append('title', formData.title);
      form.append('price', formData.price);
      form.append('deliveryTime', formData.deliveryTime);
      form.append('description', formData.description);
      form.append('about', formData.about);
      form.append('category', selectedCategory);
      selectedSkills.forEach(skill => form.append('skills[]', skill));
      inclusions.forEach(item => form.append('inclusions[]', item.value));
      images.forEach(image => form.append('images', image.file));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create skill');
      }

      const data = await response.json();
      
      // Show success message and close modal
      toast.success('Skill created successfully!');
      onClose();
      router.refresh(); // Refresh the page to show the new skill
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create skill. Please try again.");
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

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#0f1c47] to-[#1a3a8f] rounded-full mb-6">
              <FiTag className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create Your Hub
            </h2>
            <p className="text-gray-500">
              Share your services with the community
            </p>
          </div>

          {/* Form */ }
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <div className="relative">
                  <input
                    name="title"
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                    placeholder="e.g. Professional Logo Design"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                  <FiTag className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategorySelect(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-[#0f1c47] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {selectedCategory === category.id && (
                        <FiCheck className="w-4 h-4" />
                      )}
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (Select relevant ones) *
                </label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                        selectedSkills.includes(skill.id)
                          ? "bg-[#0f1c47] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {selectedSkills.includes(skill.id) && (
                        <FiCheck className="w-4 h-4" />
                      )}
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <div className="relative">
                  <input
                    name="price"
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                    placeholder="e.g. 50.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                  <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Delivery Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Time *
                </label>
                <div className="relative">
                  <select
                    name="deliveryTime"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200 appearance-none bg-white"
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: e.target.value }))}
                    required
                  >
                    <option value="">Select delivery time</option>
                    {deliveryTimes.map(time => (
                      <option key={time.id} value={time.id}>{time.name}</option>
                    ))}
                  </select>
                  <FiClock className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Images */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images (Max 3) *
                </label>
                <div className="flex flex-wrap gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden group">
                      <img 
                        src={image.preview} 
                        alt={`Preview ${index}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 3 && (
                    <div 
                      className="w-24 h-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="text-center">
                        <FiImage className="mx-auto text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Add Image</span>
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Recommended size: 800x800px. JPG, PNG (max 5MB each)
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                  rows={3}
                  placeholder="Brief description of your service..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* About */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About (Detailed explanation) *
                </label>
                <textarea
                  name="about"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent transition-all duration-200"
                  rows={5}
                  placeholder="Detailed explanation of your service, your experience, and what clients can expect..."
                  value={formData.about}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Inclusions */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inclusions (What's included in your service)
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInclusion}
                      onChange={(e) => setNewInclusion(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                      placeholder="e.g. 3 initial concepts"
                    />
                    <button
                      type="button"
                      onClick={addInclusion}
                      className="px-4 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a3a8f] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {inclusions.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FiList className="text-gray-400" />
                          <span>{item.value}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeInclusion(item.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
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
                disabled={isSubmitting || !selectedCategory || selectedSkills.length === 0 || images.length === 0}
                className={`w-full px-6 py-3.5 bg-gradient-to-r from-[#0f1c47] to-[#1a3a8f] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                  (isSubmitting || !selectedCategory || selectedSkills.length === 0 || images.length === 0) ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Hub...
                  </span>
                ) : (
                  "Create Hub"
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

export default CreateHubModal;