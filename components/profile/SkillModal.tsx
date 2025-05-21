"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Plus, Trash, X } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (service: any) => void;
  currentUser: {
    name: string;
    avatar: string;
  };
}

interface ServiceFormData {
  title: string;
  category: string;
  skills: string[];
  price: string;
  deliveryTime: string;
  description: string;
  images: File[];
}

const categories = [
  "Graphic Design",
  "Web Development",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Business",
  "Lifestyle"
];

const skillOptions: Record<string, string[]> = {
  "Graphic Design": ["Logo Design", "Brand Guidelines", "Visual Identity", "Illustration", "Print Design"],
  "Web Development": ["Frontend", "Backend", "Full Stack", "WordPress", "E-commerce"],
  "Digital Marketing": ["SEO", "Social Media", "Content Marketing", "Email Marketing", "PPC"],
  "Writing & Translation": ["Copywriting", "Technical Writing", "Content Writing", "Translation", "Proofreading"],
  "Video & Animation": ["2D Animation", "3D Animation", "Video Editing", "Motion Graphics", "Whiteboard Animation"],
  "Music & Audio": ["Voice Over", "Mixing & Mastering", "Music Production", "Sound Design", "Jingles"],
  "Programming & Tech": ["Mobile Apps", "Desktop Apps", "Game Development", "Scripting", "Chatbots"],
  "Business": ["Virtual Assistant", "Market Research", "Business Plans", "Legal Consulting", "Financial Consulting"],
  "Lifestyle": ["Life Coaching", "Health & Wellness", "Personal Styling", "Nutrition", "Fitness Training"]
};

export const ServiceModal = ({ isOpen, onClose, onAddService, currentUser }: ServiceModalProps) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    category: "",
    skills: [],
    price: "",
    deliveryTime: "",
    description: "",
    images: [],
  });
  const [currentSkill, setCurrentSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files].slice(0, 5),
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    if (currentSkill && !formData.skills.includes(currentSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill],
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formData.skills.forEach(skill => formDataToSend.append('skills[]', skill));
      formDataToSend.append('price', formData.price);
      formDataToSend.append('deliveryTime', formData.deliveryTime);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('providerName', currentUser.name);
      formDataToSend.append('providerAvatar', currentUser.avatar);
      
      // Append each image file
      formData.images.forEach((image, index) => {
        formDataToSend.append('images', image);
      });
  
      const response = await fetch('/api/services', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit service');
      }
  
      const result = await response.json();
      
      // Call the onAddService callback with the new service
      onAddService(result.service);
      onClose();
      
      // Reset form
      setFormData({
        title: "",
        category: "",
        skills: [],
        price: "",
        deliveryTime: "",
        description: "",
        images: [],
      });
    } catch (error) {
      console.error('Error submitting service:', error);
      alert('Error submitting service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSkillOptions = () => {
    if (!formData.category) return [];
    return skillOptions[formData.category] || [];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Service</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Basics Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Service Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Title*</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62aee4] focus:border-transparent"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="e.g. Luxury Brand Identity Design"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    name="category"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62aee4] focus:border-transparent"
                    onChange={handleInputChange}
                    value={formData.category}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills*</label>
                  <div className="flex gap-2">
                    <select
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62aee4] focus:border-transparent"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      disabled={!formData.category || isSubmitting}
                    >
                      <option value="">Select Skill</option>
                      {getSkillOptions().map(skill => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-2 bg-[#62aee4] text-white rounded-lg hover:bg-[#4287b8] disabled:opacity-50"
                      disabled={!currentSkill || isSubmitting}
                    >
                      Add
                    </button>
                  </div>
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map(skill => (
                        <div key={skill} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <span className="text-sm">{skill}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                            disabled={isSubmitting}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range*</label>
                    <input
                      type="text"
                      name="price"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62aee4] focus:border-transparent"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="e.g. $500-$2000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time*</label>
                    <input
                      type="text"
                      name="deliveryTime"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62aee4] focus:border-transparent"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="e.g. 7-14 days"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea
                    name="description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62aee4] focus:border-transparent"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Describe your service in detail..."
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Service Images</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#62aee4] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                  disabled={isSubmitting}
                />
                <label 
                  htmlFor="imageUpload" 
                  className={`cursor-pointer flex flex-col items-center ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <div className="mb-2 text-[#62aee4]">
                    <Plus size={24} />
                  </div>
                  <p className="text-sm text-gray-600">Drag and drop images here</p>
                  <p className="text-xs text-gray-500 mt-1">or click to browse (max 5 images)</p>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="w-full h-32 object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        disabled={isSubmitting}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#62aee4] hover:bg-[#4287b8] text-black font-bold rounded-lg transition-colors disabled:opacity-50"
                disabled={isSubmitting || !formData.category || formData.skills.length === 0}
              >
                {isSubmitting ? "Creating..." : "Create Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};