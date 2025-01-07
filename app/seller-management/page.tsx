/*"use client";

import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface Seller {
  id: number;
  name: string;
  status: string;
}

const SellerManagement: React.FC = () => {
  const [Sellers, setSellers] = useState<Seller[]>([
    
  ]);
  const [newSeller, setNewSeller] = useState({ name: '', status: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewSeller, setViewSeller] = useState<Seller | null>(null);
  const [editSeller, setEditSeller] = useState<Seller | null>(null); // State for editing Seller

  const handleDelete = (id: number) => {
    setSellers(Sellers.filter((Seller) => Seller.id !== id));
  };

  const handleEdit = (id: number) => {
    const SellerToEdit = Sellers.find((Seller) => Seller.id === id);
    if (SellerToEdit) {
      setEditSeller(SellerToEdit); // Set the Seller to be edited
    }
  };

  const handleAddSeller = () => {
    if (!newSeller.name || !newSeller.status) return;

    const newId = Sellers.length ? Sellers[Sellers.length - 1].id + 1 : 1;
    const addedSeller: Seller = {
      id: newId,
      name: newSeller.name,
      status: newSeller.status,
    };

    setSellers([...Sellers, addedSeller]);
    setNewSeller({ name: '', status: '' });
    setIsFormVisible(false); // Hide form after adding the Seller
  };

  const handleView = (Seller: Seller) => {
    setViewSeller(Seller);
  };

  const handleBack = () => {
    setViewSeller(null);
    setEditSeller(null); // Reset edit state when going back
  };

  const handleSaveEdit = () => {
    if (editSeller) {
      setSellers(
        Sellers.map((Seller) =>
          Seller.id === editSeller.id ? { ...editSeller } : Seller
        )
      );
      setEditSeller(null); // Reset edit state after saving
    }
  };

  return (
    <div>
        <HeadNavigation />
    <div className="min-h-screen bg-white text-[#182155] p-8">
    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 flex justify-between items-center px-4 sm:px-8">
  {/* Back Button *
  <button
  onClick={() => window.history.back()} // Goes back to the previous page
  className="flex items-center space-x-2 bg-[#ff199c] text-white px-5 py-2 rounded-lg text-base font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-300"
  aria-label="Go back"
>
  <FaArrowLeft className="text-xl" /> {/* Left arrow icon *
  <span className="hidden sm:inline-block">Back</span> {/* Optional text for better accessibility *
</button>


  {/* Title *
  <span className="flex-grow text-center text-sm sm:text-lg mx-4">{/* Added mx-4 for spacing *Seller Management</span>

  {/* Add Seller Button *
  <button
  onClick={() => setIsFormVisible(!isFormVisible)}
  className="flex items-center space-x-2 bg-[#ff199c] text-white px-5 py-2 rounded-lg text-base font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-300"
  aria-label={isFormVisible ? 'Hide Seller Form' : 'Add New Seller'}
>
  <span className="sm:hidden">+</span> {/* Plus icon for small screens *
  <span className="hidden sm:inline-block">{isFormVisible ? 'Hide Seller Form' : 'Add New Seller'}</span>
</button>

</h1>


{/* Seller Form *
{isFormVisible && (
  <div className="max-w-4xl mx-auto bg-[#f8f8f8] text-[#182155] rounded-lg shadow-lg p-6 sm:p-8">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Add Seller</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <input
        type="text"
        placeholder="Seller Name"
        value={newSeller.name}
        onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
        className="p-3 sm:p-4 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300 text-sm sm:text-base"
      />
      <input
        type="text"
        placeholder="status"
        value={newSeller.status}
        onChange={(e) => setNewSeller({ ...newSeller, status: e.target.value })}
        className="p-3 sm:p-4 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300 text-sm sm:text-base"
      />
      <button
        onClick={handleAddSeller}
        className="col-span-1 sm:col-span-2 lg:col-span-3 bg-[#ff199c] text-white p-3 sm:p-4 rounded-md text-lg font-semibold hover:bg-pink-700 transition duration-300"
        aria-label="Add Seller"
      >
        <span className="sm:hidden">+</span> {/* Plus icon for small screens *
        <span className="hidden sm:inline">Add Seller</span> {/* Show text only on larger screens *
      </button>
    </div>
  </div>
)}


      {/* Seller List *
{!viewSeller && !editSeller && (
  <div className="mt-8 px-4 sm:px-6">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
      Seller List
    </h2>
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Sellers.map((Seller) => (
        <div
          key={Seller.id}
          className="bg-[#f8f8f8] text-[#182155] rounded-lg p-4 sm:p-6 shadow-md flex flex-col justify-between space-y-4"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">{Seller.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{Seller.status}</p>
          </div>
          <div className="flex justify-between sm:space-x-4 space-x-2">
            <button
              onClick={() => handleEdit(Seller.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(Seller.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-red-700 transition duration-300 w-full sm:w-auto"
            >
              Delete
            </button>
            <button
              onClick={() => handleView(Seller)}
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-green-700 transition duration-300 w-full sm:w-auto"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


      {/* Seller Detail View *
      {viewSeller && (
        <div className="max-w-4xl mx-auto bg-[#f8f8f8] text-[#182155] rounded-lg shadow-lg p-8 mt-8">
          <button
            onClick={handleBack}
            className="bg-[#ff199c] text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-pink-700 transition duration-300 mb-6"
          >
            Back to Sellers
          </button>
          <h2 className="text-3xl font-bold text-center mb-6">{viewSeller.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              
              <p className="text-lg">{viewSeller.status}</p>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/400"
                alt="Seller Image"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* Seller Edit View *
      {editSeller && (
        <div className="max-w-4xl mx-auto bg-[#f8f8f8] text-[#182155] rounded-lg shadow-lg p-8 mt-8">
            <button
            onClick={handleBack}
            className="bg-[#ff199c] text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-pink-700 transition duration-300 mb-6"
          >
            Back to Sellers
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Seller</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Seller Name"
              value={editSeller.name}
              onChange={(e) => setEditSeller({ ...editSeller, name: e.target.value })}
              className="p-3 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300"
            />
            {/*<input
            type="number"
            placeholder="Price"
            value={editSeller.price}
            onChange={(e) =>
                setEditSeller({
                ...editSeller,
                price: parseFloat(e.target.value), // Convert the string to a number
                })
            }
            className="p-3 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300"
            />*
            <input
              type="text"
              placeholder="status"
              value={editSeller.status}
              onChange={(e) => setEditSeller({ ...editSeller, status: e.target.value })}
              className="p-3 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300"
            />
            <button
              onClick={handleSaveEdit}
              className="col-span-1 md:col-span-3 bg-[#ff199c] text-white p-3 rounded-md text-lg font-semibold hover:bg-pink-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default <SellerManagement></SellerManagement>*/
"use client";

import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

interface Seller {
  _id: string;  // MongoDB _id is usually a string in the frontend, even though it's an ObjectId in MongoDB
  name: string;
  status: string;
}


const SellerManagement: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [newSeller, setNewSeller] = useState({ name: '', status: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewSeller, setViewSeller] = useState<Seller | null>(null);
  const [editSeller, setEditSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch sellers from the API
  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://shaddyna-backend.onrender.com/api/sellers/'); // Adjust API route as needed
        setSellers(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch sellers.');
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`/api/sellers/${_id}`); // Adjust API route as needed
      setSellers(sellers.filter((seller) => seller._id !== _id));
    } catch (err) {
      console.error('Failed to delete seller:', err);
    }
  };

  const handleEdit = (_id: string) => {
    const sellerToEdit = sellers.find((seller) => seller._id === _id);
    if (sellerToEdit) {
      setEditSeller(sellerToEdit);
    }
  };

  const handleAddSeller = async () => {
    if (!newSeller.name || !newSeller.status) return;

    try {
      const response = await axios.post('/api/sellers', {
        name: newSeller.name,
        status: newSeller.status,
      });
      setSellers([...sellers, response.data]);
      setNewSeller({ name: '', status: '' });
      setIsFormVisible(false);
    } catch (err) {
      console.error('Failed to add seller:', err);
    }
  };

  const handleView = (seller: Seller) => {
    setViewSeller(seller);
  };

  const handleBack = () => {
    setViewSeller(null);
    setEditSeller(null);
  };

  const handleSaveEdit = async () => {
    if (editSeller) {
      console.log('Edit seller _id:', editSeller._id);  // Log the ID to check
      try {
        const response = await axios.put(`https://shaddyna-backend.onrender.com/api/sellers/edit/${editSeller._id}`, editSeller);
        setSellers(
          sellers.map((seller) =>
            seller._id === editSeller._id ? response.data : seller
          )
        );
        setEditSeller(null);
      } catch (err) {
        console.error('Failed to update seller:', err);
      }
    }
  };
  
  

  return (
    <div>
      <HeadNavigation />
      <div className="container mx-auto p-4">
        {loading ? (
          <p>Loading sellers...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {viewSeller ? (
              <div>
                <button onClick={handleBack} className="mb-4 flex items-center">
                  <FaArrowLeft /> Back
                </button>
                <h2>{viewSeller.name}</h2>
                <p>Status: {viewSeller.status}</p>
              </div>
            ) : editSeller ? (
                <div>
                  <button onClick={handleBack} className="mb-4 flex items-center">
                    <FaArrowLeft /> Back
                  </button>
                  <h2>Edit Seller</h2>
                  <input
                    type="text"
                    value={editSeller.name}
                    onChange={(e) =>
                      setEditSeller({ ...editSeller, name: e.target.value })
                    }
                    placeholder="Name"
                    className="border p-2"
                  />
                  <select
                    value={editSeller.status}
                    onChange={(e) =>
                      setEditSeller({ ...editSeller, status: e.target.value })
                    }
                    className="border p-2 mt-2"
                  >
                    <option value="active">Activate</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Deactivate</option>
                  </select>
                  <button onClick={handleSaveEdit} className="btn-primary mt-4">
                    Save
                  </button>
                </div>
              ) : (              
              <>
                <h1>Seller Management</h1>
                <ul>
                  {sellers.map((seller) => (
                    <li key={seller._id} className="mb-4 border-b pb-2">
                      <h3>{seller.name}</h3>
                      <p>Status: {seller.status}</p>
                      <button onClick={() => handleView(seller)} className="btn-secondary">
                        View
                      </button>
                      <button onClick={() => handleEdit(seller._id)} className="btn-secondary ml-2">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(seller._id)} className="btn-danger ml-2">
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                {isFormVisible ? (
                  <div>
                    <h2>Add Seller</h2>
                    <input
                      type="text"
                      value={newSeller.name}
                      onChange={(e) =>
                        setNewSeller({ ...newSeller, name: e.target.value })
                      }
                      placeholder="Name"
                      className="border p-2"
                    />
                    <input
                      type="text"
                      value={newSeller.status}
                      onChange={(e) =>
                        setNewSeller({ ...newSeller, status: e.target.value })
                      }
                      placeholder="Status"
                      className="border p-2"
                    />
                    <button onClick={handleAddSeller} className="btn-primary mt-4">
                      Add
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsFormVisible(true)} className="btn-primary mt-4">
                    Add Seller
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default SellerManagement;
