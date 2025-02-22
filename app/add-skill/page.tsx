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
