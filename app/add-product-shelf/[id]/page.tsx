"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUserSellerStore } from "@/store/useUserSellerStore"; // Adjust the import based on your store location

interface Product {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  images: File[];
}

interface Category {
    _id: string;
    name: string;
  }

const AddProductPage = () => {
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    images: [],
  });
  const [products, setProducts] = useState<any[]>([]); // Assuming you have a state for products
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true); // Manage form visibility
  const [categories, setCategories] = useState<Category[]>([]);

  const pathname = usePathname();
  const shelfId = pathname.split("/").pop() || ""; // Extract shelfId from URL

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://shaddyna-backend.onrender.com/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    // Fetch current user and sellers from the store
    await useUserSellerStore.getState().fetchCurrentUser();
    const currentUserRole = useUserSellerStore.getState().currentUserRole;

    // Ensure the current user is a seller
    /*if (currentUserRole !== "seller") {
      alert("Only sellers can add products.");
      return;
    }*/

    const { user } = useUserSellerStore.getState();
    if (!user) {
      alert("User information is missing. Please log in.");
      return;
    }

    // Validate if all required fields are provided
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.categoryId ||
      newProduct.images.length === 0
    ) {
      alert("All fields (name, price, description, category, and images) are required");
      return;
    }

    const addedProduct = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      categoryId: newProduct.categoryId,
      shelfId,
    };

    try {
      const formData = new FormData();
      formData.append("name", addedProduct.name);
      formData.append("price", addedProduct.price.toString());
      formData.append("description", addedProduct.description);
      formData.append("categoryId", addedProduct.categoryId);
      formData.append("shelfId", addedProduct.shelfId); // Append shelfId to FormData

      newProduct.images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("https://shaddyna-backend.onrender.com/api/products/add", { // Adjust the URL as needed
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Failed to add product");
        return;
      }

      const savedProduct = await response.json();
      setProducts([...products, savedProduct.product]);
      setNewProduct({ name: "", price: "", description: "", categoryId: "", images: [] });
      setIsFormVisible(false);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewProduct((prev) => ({
      ...prev,
      images: files,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {isFormVisible && (
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6">Add New Product</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>

            <select
            value={newProduct.categoryId}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
            className="w-full p-3 mt-4 border border-gray-300 rounded-md"
            >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
                ))}
            </select>
            {/*<div className="space-y-2">
              <label htmlFor="categoryId" className="block text-sm font-medium">Category</label>
              <input
                type="text"
                id="categoryId"
                name="categoryId"
                value={newProduct.categoryId}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>*/}

            <div className="space-y-2">
              <label htmlFor="images" className="block text-sm font-medium">Product Images</label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              onClick={handleAddProduct}
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProductPage;



