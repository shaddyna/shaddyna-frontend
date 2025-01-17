/*"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

type Category = {
  _id?: string;
  name: string;
  description?: string;
};

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({ name: '', description: '' });
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(' http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!newCategory.name) {
      alert('Name is required');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/categories', newCategory);
      setNewCategory({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editCategory || !editCategory._id) {
      alert('Invalid category to update');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/categories/${editCategory._id}`, editCategory);
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>

      {/* Create new category 
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Add New Category</h2>
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={newCategory.description || ''}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleCreate}>
          Add Category
        </button>
      </div>

      {/* List categories *
      <h2 className="text-xl font-semibold">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="flex justify-between items-center border p-2 my-2">
            {editCategory && editCategory._id === category._id ? (
              <>
                <input
                  className="border p-1"
                  value={editCategory.name || ''}
                  onChange={(e) =>
                    setEditCategory((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev
                    )
                  }
                />
                <textarea
                  className="border p-1"
                  value={editCategory.description || ''}
                  onChange={(e) =>
                    setEditCategory((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                ></textarea>
                <button className="bg-green-500 text-white px-2" onClick={handleUpdate}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{category.name}</span>
                <button
                  className="bg-yellow-500 text-white px-2"
                  onClick={() => setEditCategory(category)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2"
                  onClick={() => handleDelete(category._id!)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategories;*/


/*"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import HeadNavigation from '@/components/HeadNavigation';
import Footer from '@/components/Footer';
import BottomNavigationBar from '@/components/BottomNav';
import BackButton from '@/components/BackButton';

type Category = {
  _id?: string;
  name: string;
  description?: string;
};

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({ name: '', description: '' });
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://shaddyna-backend.onrender.com/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!newCategory.name) {
      alert('Name is required');
      return;
    }
    try {
      await axios.post('https://shaddyna-backend.onrender.com/api/categories', newCategory);
      setNewCategory({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editCategory || !editCategory._id) {
      alert('Invalid category to update');
      return;
    }
    try {
      await axios.put(`https://shaddyna-backend.onrender.com/api/categories/${editCategory._id}`, editCategory);
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://shaddyna-backend.onrender.com/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <HeadNavigation />
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
    <div className="flex items-center justify-between p-3 pt-0">
  <BackButton />
  <h1 className="text-3xl font-bold text-[#182155]">
    Categories
  </h1>
</div>


      {/* Create new category *
      <div className="bg-[#ff199c] p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Add New Category</h2>
        <div className="space-y-4">
          <input
            className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <textarea
            className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
            placeholder="Category Description"
            value={newCategory.description || ''}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          ></textarea>
          <button
            className="w-full py-3 bg-[#182155] text-white font-semibold rounded-md hover:bg-[#ff199c] transition duration-300"
            onClick={handleCreate}
          >
            Add Category
          </button>
        </div>
      </div>

      {/* List categories *
      <h2 className="text-2xl font-semibold text-[#182155] mb-4">Categories</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category._id}
            className="flex justify-between items-center p-4 bg-[#f1f5f8] rounded-lg shadow-md hover:bg-[#e3e8f1] transition duration-300"
          >
            {editCategory && editCategory._id === category._id ? (
              <div className="space-y-4">
                <input
                  className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                  value={editCategory.name || ''}
                  onChange={(e) =>
                    setEditCategory((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev
                    )
                  }
                />
                <textarea
                  className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                  value={editCategory.description || ''}
                  onChange={(e) =>
                    setEditCategory((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                ></textarea>
                <button
                  className="bg-[#182155] text-white px-4 py-2 rounded-md hover:bg-[#ff199c] transition duration-300"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-semibold text-[#182155]">{category.name}</span>
                <div className="space-x-4">
                  <button
                    className="bg-[#ff199c] text-white px-4 py-2 rounded-md hover:bg-[#182155] transition duration-300"
                    onClick={() => setEditCategory(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#182155] text-white px-4 py-2 rounded-md hover:bg-[#ff199c] transition duration-300"
                    onClick={() => handleDelete(category._id!)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default AdminCategories;*/


"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import HeadNavigation from '@/components/HeadNavigation';
import Footer from '@/components/Footer';
import BottomNavigationBar from '@/components/BottomNav';
import BackButton from '@/components/BackButton';

type Category = {
  _id?: string;
  name: string;
  description?: string;
  imageUrl?: string;  // Add imageUrl to the Category type
};

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({ name: '', description: '' });
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [image, setImage] = useState<File | null>(null);  // New state for the image file

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    // Step 1: Check if name is provided
    if (!newCategory.name) {
      alert('Name is required');
      return;
    }
  
    // Step 2: Log the data being sent
    console.log('Category Data to be Sent:', newCategory);
  
    // Step 3: Create FormData object and append the category data
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('description', newCategory.description || '');
  
    // Step 4: Log the FormData before appending the image to ensure it contains name and description
    console.log('FormData Entries (before image):');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    // Step 5: Append the image if provided
    if (image) {
      console.log('Selected Image:', image);
      formData.append('image', image);
    } else {
      console.log('No image selected');
    }
  
    // Step 6: Log FormData after appending image
    console.log('FormData Entries (after image):');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    // Step 7: Send the POST request to create the category
    try {
      const response = await axios.post('http://localhost:5000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Let the browser set this automatically
        },
      });
      
      console.log('Category created:', response.data);
  
      // Step 8: Reset the form data after successful submission
      setNewCategory({ name: '', description: '' });
      setImage(null);  // Reset the image after submission
  
      // Step 9: Fetch updated categories
      fetchCategories();
    } catch (error) {
      // Step 10: Handle errors during category creation
      console.error('Error creating category:', error);
    }
  };
  
  
  
  
  

  const handleUpdate = async () => {
    if (!editCategory || !editCategory._id) {
      alert('Invalid category to update');
      return;
    }

    const formData = new FormData();
    formData.append('name', editCategory.name);
    formData.append('description', editCategory.description || '');
    
    // If an image is selected, append it to the form data
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`https://shaddyna-backend.onrender.com/api/categories/${editCategory._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditCategory(null);
      setImage(null);  // Reset the image after submission
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://shaddyna-backend.onrender.com/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <HeadNavigation />
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex items-center justify-between p-3 pt-0">
          <BackButton />
          <h1 className="text-3xl font-bold text-[#182155]">Categories</h1>
        </div>

        {/* Create new category */}
        <div className="bg-[#ff199c] p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Add New Category</h2>
          <div className="space-y-4">
            <input
              className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <textarea
              className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
              placeholder="Category Description"
              value={newCategory.description || ''}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            ></textarea>
            <input
              type="file"
              className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
            <button
              className="w-full py-3 bg-[#182155] text-white font-semibold rounded-md hover:bg-[#ff199c] transition duration-300"
              onClick={handleCreate}
            >
              Add Category
            </button>
          </div>
        </div>

        {/* List categories */}
        <h2 className="text-2xl font-semibold text-[#182155] mb-4">Categories</h2>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex justify-between items-center p-4 bg-[#f1f5f8] rounded-lg shadow-md hover:bg-[#e3e8f1] transition duration-300"
            >
              {editCategory && editCategory._id === category._id ? (
                <div className="space-y-4">
                  <input
                    className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                    value={editCategory.name || ''}
                    onChange={(e) =>
                      setEditCategory((prev) =>
                        prev ? { ...prev, name: e.target.value } : prev
                      )
                    }
                  />
                  <textarea
                    className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                    value={editCategory.description || ''}
                    onChange={(e) =>
                      setEditCategory((prev) =>
                        prev ? { ...prev, description: e.target.value } : prev
                      )
                    }
                  ></textarea>
                  <input
                    type="file"
                    className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  />
                  <button
                    className="bg-[#182155] text-white px-4 py-2 rounded-md hover:bg-[#ff199c] transition duration-300"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-semibold text-[#182155]">{category.name}</span>
                  <div className="space-x-4">
                    <button
                      className="bg-[#ff199c] text-white px-4 py-2 rounded-md hover:bg-[#182155] transition duration-300"
                      onClick={() => setEditCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#182155] text-white px-4 py-2 rounded-md hover:bg-[#ff199c] transition duration-300"
                      onClick={() => handleDelete(category._id!)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default AdminCategories;


