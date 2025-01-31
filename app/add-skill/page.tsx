/*"use client";
import React, { useEffect, useState } from "react";
import { useUserSellerStore } from "@/store/useUserSellerStore";
import Footer from "@/components/Footer";
import Back from "@/components/Back";
import { useRouter } from 'next/navigation';
import axios from "axios";

const AddService: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    description: "",
    level: "",
    price: "",
    contact: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [cimage, setCImage] = useState<File | null>(null);
  const [pimage, setPImage] = useState<File | null>(null);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const fetchCurrentUser = useUserSellerStore((state) => state.fetchCurrentUser);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    images: [],
  });

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/api/portfolio/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("New product added:", response.data);
        setNewProduct({ name: "", price: "", description: "", categoryId: "", images: [] });
        setIsFormVisible(false); // Close the form after adding the product
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    const initializeSeller = async () => {
      try {
        await fetchCurrentUser();
        const currentUserRole = useUserSellerStore.getState().currentUserRole;

        if (currentUserRole === "seller") {
          const { user, sellers } = useUserSellerStore.getState();

          if (!user) {
            console.error("User is null.");
            return;
          }

          const seller = sellers.find((seller) => seller.email === user.email);

          if (seller) {
            setSellerId(seller._id);
            console.log(`Seller ID set to: ${seller._id}`);
          } else {
            console.error("No matching seller found for the current user.");
          }
        }
      } catch (error) {
        console.error("An error occurred during seller initialization:", error);
      }
    };

    initializeSeller();
  }, [fetchCurrentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Log the form data to the console
    console.log("Form Data:", formData);
  
    // Log the selected image (if any)
    if (cimage) {
      console.log("Selected Image:", cimage.name);
    } else {
      console.log("No image selected.");
    }

    // Log the selected image (if any)
    if (pimage) {
      console.log("Selected Image:", pimage.name);
    } else {
      console.log("No image selected.");
    }
  
    // Prepare the FormData
    const form = new FormData();
    form.append("name", formData.name);
    form.append("service", formData.service);
    form.append("description", formData.description);
    form.append("level", formData.level);
    form.append("price", formData.price);
    form.append("contact", formData.contact);
   
  
    // Append the image file if selected
    if (image) {
      form.append("image", image);
    }

    // Append the image file if selected
    if (cimage) {
      form.append("image", cimage);
    }

    // Append the image file if selected
    if (pimage) {
      form.append("image", pimage);
    }
  
  
    // Append the sellerId if available
    /*if (sellerId) {
      form.append("sellerId", sellerId);
    }*
  
    // Log the FormData manually by iterating over it
    console.log("FormData to be sent:");
    form.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    try {
      const response = await fetch("http://localhost:5000/api/skills/create", {
        method: "POST",
        body: form, // Send the form data including image
      });
  
      if (response.ok) {
        console.log("Skill created successfully");
        router.push('/');
      } else {
        const errorData = await response.json();
        console.error("Failed to create shop:", errorData);
      }
    } catch (error) {
      console.error("Error during shop creation:", error);
    }
  };
  
  

  return (
    <div>
      <Back title={"Manage Your Service"} />
      <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
        <div className="bg-[#f8f9fa] shadow-lg rounded-lg w-full max-w-5xl p-6 md:p-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4"
          >
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                onChange={(e) => setCImage(e.target.files ? e.target.files[0] : null)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Image</label>
              <input
                type="file"
                className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                onChange={(e) => setPImage(e.target.files ? e.target.files[0] : null)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Offered</label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="mt-2 text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-2 text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <input
                type="number"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="mt-2 text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Standard Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-2 text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="mt-2 text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#182155] hover:bg-[#e21788] text-white font-medium py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff199c]"
              >
                Create Service
              </button>
            </div>
            <div className="container mx-auto">
          {isFormVisible ? (
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#182155]">Add to Portfolio</h2>
              <input
                type="text"
                placeholder="Service Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-3 mt-4 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Service Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full p-3 mt-4 border border-gray-300 rounded-md"
              />
              <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              />
            </div>

              <button
                onClick={handleAddProduct}
                className="mt-4 bg-[#ff199c] text-white p-2 rounded-md"
              >
                Add Product
              </button>
              <button
                onClick={() => setIsFormVisible(false)}
                className="mt-4 ml-4 text-[#ff199c] hover:underline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsFormVisible(true)}
              className="mt-6 bg-[#ff199c] text-white p-2 rounded-md"
            >
              Add to Portfolio
            </button>
          )}
        </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddService*/


/*"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";

interface Member {
  id: number;
  name: string;
  role: string;
  image: File | null;  // New field to hold the member image
}

interface Shelf {
  name: string;
  description: string;
  price: string;
  members: Member[];
}

const AddShelfPage = () => {
  const { register, handleSubmit, control, reset } = useForm<Shelf>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      members: [{ id: 1, name: "", role: "", image: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  /*const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedMembers = [...fields];
      updatedMembers[index].image = file;
      setImageFile(file);  // Set the image file for the member
    }
  };*

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedMembers = [...fields];
      updatedMembers[index] = { ...updatedMembers[index], image: file }; // Ensure image is updated in the field array
      setImageFile(file); // Maintain reference for debugging
    }
  };
  
  const onSubmit = async (data: Shelf) => {
    setIsSubmitting(true);
    const formData = new FormData();
  
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
  
    // Append shelf image
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    // Log members before appending
    console.log("👥 Members before submission:", data.members);
  
    // Append members separately
    data.members.forEach((member, index) => {
      formData.append(`members[${index}][name]`, member.name);
      formData.append(`members[${index}][role]`, member.role);
  
      // Log member image before appending
      console.log(`📸 Member ${index + 1} image:`, member.image);
  
      // Append member image correctly
      if (member.image instanceof File) {
        formData.append("memberImages", member.image);
      } else {
        console.warn(`⚠️ Member ${index + 1} image is missing or not a File.`);
      }
    });
  
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/create", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to add shelf");
  
      alert("Shelf added successfully!");
      reset();
      setImageFile(null);
    } catch (error) {
      alert("Error adding shelf");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div>
      <Back title={"Add Skill"} />
      <div className="max-w-2xl mx-auto p-3 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block font-semibold text-gray-700">Name</label>
            <input {...register("name", { required: true })} type="text" className="w-full p-2 border rounded-md" />
          </div>
          <label className="block font-semibold text-gray-700">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleImageChange(event, 0)} // Use index 0 for shelf image
            className="w-full p-2 border rounded-md"
          />
          <label className="block font-semibold text-gray-700">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleImageChange(event, 0)} // Use index 0 for shelf image
            className="w-full p-2 border rounded-md"
          />
          <div>
            <label className="block font-semibold text-gray-700">Service Offered</label>
            <textarea {...register("description", { required: true })} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Description</label>
            <textarea {...register("description", { required: true })} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Level</label>
            <input {...register("price", { required: true })} type="number" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Standard Price</label>
            <input {...register("price", { required: true })} type="number" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Contact</label>
            <input {...register("price", { required: true })} type="number" className="w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Add Portfolio</label>
            {/*{fields.map((member, index) => (
              <div key={member.id} className="flex space-x-2 mt-2">
                <input {...register(`members.${index}.name`, { required: true })} type="text" placeholder="Project Name" className="w-full p-2 border rounded-md" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, index)}  // ✅ Pass index correctly
                  className="w-full p-2 border rounded-md"
                />
                {index > 0 && <button type="button" onClick={() => remove(index)} className="text-red-500 font-bold">X</button>}
              </div>
            ))}*
          {fields.map((member, index) => (
            <div key={member.id} className="flex flex-col sm:flex-row sm:space-x-2 mt-2">
              {/* Member Name Input *
              <input
                {...register(`members.${index}.name`, { required: true })}
                type="text"
                placeholder="Project Name"
                className="w-full p-2 border rounded-md mb-2 sm:mb-0 sm:w-auto"
              />

              {/* Member Image Input *
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageChange(event, index)}
                className="w-full p-2 border rounded-md mb-2 sm:mb-0 sm:w-auto"
              />

              {/* Remove Button *
              {index > 0 && {
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 font-bold mt-2 sm:mt-0"
                >
                  X
                </button>
              )}
            </div>
          ))}
            <button type="button" onClick={() => append({ id: fields.length + 1, name: "", role: "", image: null })} className="mt-2 text-blue-600 font-semibold">+ Add Portfolio Item</button>
          </div>

          <button type="submit" className="w-full bg-[#182155] text-white font-bold py-2 rounded-md hover:bg-[#182155]" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Skill"}
          </button>
        </form>
      </div>
      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default AddShelfPage;*/



"use client"
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";

interface Member {
  id: number;
  name: string;
  description: string;
  image: File | null; // New field to hold the member image
}

interface Skill {
  name: string;
  description: string;
  price: string;
  members: Member[];
  service:string;
  stdprice:string;
  contact: string;
  level: string;
}

const AddShelfPage = () => {
  const { register, handleSubmit, control, reset, setValue, watch } = useForm<Skill>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      service: "",
      level:"",
      stdprice: "",
      contact: "",
      members: [{ id: 1, name: "", description: "", image: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      // Update the image in the form state
      setValue(`members.${index}.image`, file); // Updated key path without the square brackets
  
      // Optional: Update local state to track the selected file for debugging
      setImageFile(file);
    }
  };
  

  const onSubmit = async (data: Skill) => {
    setIsSubmitting(true);
    const formData = new FormData();
  
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("service", data.service);
    formData.append("level", data.level);
    formData.append("stdprice", data.stdprice);
    formData.append("contact", data.contact);
  
    // Append shelf image
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    // Log members before appending
    console.log("👥 Members before submission:", data.members);
  
    // Append members separately
    data.members.forEach((member, index) => {
      formData.append(`members[${index}][name]`, member.name);
      formData.append(`members[${index}][description]`, member.description);
  
      // Log member image before appending
      console.log(`📸 Member ${index + 1} image:`, member.image);
  
      // Append member image correctly
      if (member.image instanceof File) {
        formData.append("memberImages", member.image);
      } else {
        console.warn(`⚠️ Member ${index + 1} image is missing or not a File.`);
      }
    });
  
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/skill/create", {
        // const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/create", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to add shelf");
  
      alert("Shelf added successfully!");
      reset();
      setImageFile(null);
    } catch (error) {
      alert("Error adding shelf");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Back title={"Add Skill"} />
      <div className="max-w-2xl mx-auto p-3 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block font-semibold text-gray-700">Name</label>
            <input {...register("name", { required: true })} type="text" className="w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(event, 0)} // Use index 0 for shelf image
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(event, 1)} // Use index 0 for shelf image
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Service Offered</label>
            <textarea {...register("description", { required: true })} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Description</label>
            <textarea {...register("service", { required: true })} className="w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Level</label>
            <input {...register("level", { required: true })} type="number" className="w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Standard Price</label>
            <input {...register("stdprice", { required: true })} type="number" className="w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Contact</label>
            <input {...register("contact", { required: true })} type="number" className="w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Add Portfolio:</label>
            {fields.map((member, index) => (
              <div key={member.id} className="flex flex-col sm:flex-row sm:space-x-2 mt-2">
                {/* Member Name Input */}
                <input
                  {...register(`members.${index}.name`, { required: true })}
                  type="text"
                  placeholder="Project Name"
                  className="w-full p-2 border rounded-md mb-2 sm:mb-0 sm:w-auto"
                />
                  {/* Member Role Input */}
                  <input
                  {...register(`members.${index}.description`, { required: true })}
                  type="text"
                  placeholder="Project Description"
                  className="w-full p-2 border rounded-md mb-2 sm:mb-0 sm:w-auto"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, index)}
                  className="w-full p-2 border rounded-md mb-2 sm:mb-0 sm:w-auto"
                />
                {/* Remove Button */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 font-bold mt-2 sm:mt-0"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => append({ id: fields.length + 1, name: "", description: "", image: null })} className="mt-2 text-blue-600 font-semibold">+ Add Portfolio</button>
          </div>

          <button type="submit" className="w-full bg-[#182155] text-white font-bold py-2 rounded-md hover:bg-[#182155]" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Skill"}
          </button>
        </form>
      </div>
      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default AddShelfPage;
