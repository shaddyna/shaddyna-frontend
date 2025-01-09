/*"use client";

import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface Product {
  id: string; // id as string
  name: string;
  price: number;
  description: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch all products from API on component mount
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  const handleDelete = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (id: string) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setEditProduct({ ...productToEdit }); // Create a new object to prevent reference issues
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      alert("All fields are required");
      return;
    }

    const addedProduct = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
    };

    try {
      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(addedProduct),
      });

      if (!response.ok) {
        alert("Failed to add product");
        return;
      }

      const savedProduct = await response.json();
      setProducts([...products, savedProduct]);
      setNewProduct({ name: "", price: "", description: "" });
      setIsFormVisible(false); // Hide form after adding the product
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  const handleView = (product: Product) => {
    setViewProduct(product);
  };

  const handleBack = () => {
    setViewProduct(null);
    setEditProduct(null);
  };

  const handleSaveEdit = async () => {
    if (editProduct) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/update/${editProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(editProduct),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();
        setProducts(
          products.map((product) =>
            product.id === editProduct.id ? updatedProduct : product
          )
        );
        setEditProduct(null); // Reset edit state after saving
        alert("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product. Please try again.");
      }
    }
  };

  return (
    <div>
      <HeadNavigation />
      <main>
        <h1>Product Management</h1>
        {viewProduct ? (
          <div>
            <button onClick={handleBack}>
              <FaArrowLeft /> Back
            </button>
            <h2>{viewProduct.name}</h2>
            <p>Price: ${viewProduct.price}</p>
            <p>{viewProduct.description}</p>
          </div>
        ) : editProduct ? (
          <div>
            <button onClick={handleBack}>
              <FaArrowLeft /> Back
            </button>
            <input
              type="text"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
            <input
              type="number"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })
              }
            />
            <textarea
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({ ...editProduct, description: e.target.value })
              }
            />
            <button onClick={handleSaveEdit}>Save</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setIsFormVisible(!isFormVisible)}>
              {isFormVisible ? "Cancel" : "Add Product"}
            </button>
            {isFormVisible && (
              <div>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Product Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <textarea
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                />
                <button onClick={handleAddProduct}>Add Product</button>
              </div>
            )}
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => handleView(product)}>View</button>
                  <button onClick={() => handleEdit(product.id)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ProductManagement;*/



/*"use client";

import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch all products from API on component mount
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts = data.products.map((product: any) => ({
          id: product._id.toString(), // Convert ObjectId to string and map to 'id'
          name: product.name,
          price: product.price,
          description: product.description,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove the deleted product from the local state
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handleEdit = (id: string) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setEditProduct({ ...productToEdit }); // Create a new object to prevent reference issues
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      alert("All fields are required");
      return;
    }

    const addedProduct = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
    };

    try {
      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(addedProduct),
      });

      if (!response.ok) {
        alert("Failed to add product");
        return;
      }

      const savedProduct = await response.json();
      setProducts([...products, savedProduct]);
      setNewProduct({ name: "", price: "", description: "" });
      setIsFormVisible(false); // Hide form after adding the product
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  const handleView = (product: Product) => {
    setViewProduct(product);
  };

  const handleBack = () => {
    setViewProduct(null);
    setEditProduct(null);
  };

  const handleSaveEdit = async () => {
    if (editProduct) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/update/${editProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(editProduct),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();
        setProducts(
          products.map((product) =>
            product.id === editProduct.id ? updatedProduct : product
          )
        );
        setEditProduct(null); // Reset edit state after saving
        alert("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product. Please try again.");
      }
    }
  };

  return (
    <div>
      <HeadNavigation />
      {/* Render view or edit based on state *
      {viewProduct ? (
        <div>
          <h2>Product Details</h2>
          <p>ID: {viewProduct.id}</p> {/* Displaying the product ID *
          <p>Name: {viewProduct.name}</p>
          <p>Price: {viewProduct.price}</p>
          <p>Description: {viewProduct.description}</p>
          <button onClick={handleBack}>Back</button>
        </div>
      ) : editProduct ? (
        <div>
          <h2>Edit Product</h2>
          <input
            type="text"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
          />
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
          />
          <textarea
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleBack}>Cancel</button>
        </div>
      ) : isFormVisible ? (
        <div>
          <h2>Add New Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <textarea
            placeholder="Product Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button onClick={handleAddProduct}>Add Product</button>
          <button onClick={() => setIsFormVisible(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <p>ID: {product.id}</p> {/* Displaying the product ID *
                <p>{product.name}</p>
                <button onClick={() => handleView(product)}>View</button>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsFormVisible(true)}>Add Product</button>
        </div>
      )}
      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default ProductManagement;*/

"use client";

import BackButton from "@/components/BackButton";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface Product {
  id: string;           // Unique identifier for the product
  name: string;         // Name of the product
  price: number;        // Price of the product
  description: string;  // Description of the product
  categoryId?: string;  // Optional category ID (string format for ObjectId)
}

interface Category {
  _id: string;
  name: string;
}


const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", categoryId: '', });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);


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


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts = data.products.map((product: any) => ({
          id: product._id.toString(),
          name: product.name,
          price: product.price,
          description: product.description,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://shaddyna-backend.onrender.com/api/products/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handleEdit = (id: string) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setEditProduct({ ...productToEdit });
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.categoryId) {
      alert("All fields (name, price, description, and category) are required");
      return;
    }
  
    const addedProduct = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      categoryId: newProduct.categoryId, // Send the actual ObjectId of the selected category
    };
  
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(addedProduct),
      });
  
      if (!response.ok) {
        alert("Failed to add product");
        return;
      }
  
      const savedProduct = await response.json();
      setProducts([...products, savedProduct.product]);
      setNewProduct({ name: "", price: "", description: "", categoryId: "" });
      setIsFormVisible(false);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };
  
  
  
  const handleView = (product: Product) => {
    setViewProduct(product);
  };

  const handleBack = () => {
    setViewProduct(null);
    setEditProduct(null);
  };

  const handleSaveEdit = async () => {
    if (editProduct) {
      try {
        const response = await fetch(`https://shaddyna-backend.onrender.com/api/products/update/${editProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(editProduct),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();
        setProducts(
          products.map((product) =>
            product.id === editProduct.id ? updatedProduct : product
          )
        );
        setEditProduct(null);
        alert("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <HeadNavigation />
      <div className="container mx-auto p-6">
  <div className="flex items-center justify-between">
    <BackButton />
    <h1 className="text-3xl font-bold text-[#182155]">
      Product Management
    </h1>
  </div>
</div>

      {viewProduct ? (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#182155]">Product Details</h2>
          <p className="text-sm text-gray-600">ID: {viewProduct.id}</p>
          <p className="text-lg font-semibold text-[#182155]">Name: {viewProduct.name}</p>
          <p className="text-lg text-[#ff199c]">Price: ${viewProduct.price}</p>
          <p className="text-gray-600">{viewProduct.description}</p>
          <button 
            onClick={handleBack} 
            className="mt-4 text-[#ff199c] hover:underline">
            <FaArrowLeft /> Back
          </button>
        </div>
      ) : editProduct ? (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#182155]">Edit Product</h2>
          <input
            type="text"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            className="w-full p-3 mt-4 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
            className="w-full p-3 mt-4 border border-gray-300 rounded-md"
          />
          <textarea
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
            className="w-full p-3 mt-4 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSaveEdit}
            className="mt-4 bg-[#ff199c] text-white p-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={handleBack}
            className="mt-4 ml-4 text-[#ff199c] hover:underline"
          >
            Cancel
          </button>
        </div>
     ) : isFormVisible ? (
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#182155]">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="w-full p-3 mt-4 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="w-full p-3 mt-4 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="w-full p-3 mt-4 border border-gray-300 rounded-md"
        />
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
    
        <div className="container mx-auto p-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <li key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                <p className="font-semibold text-[#182155]">ID: {product.id}</p>
                <p className="text-xl text-[#182155]">{product.name}</p>
                <button
                  onClick={() => handleView(product)}
                  className="text-[#ff199c] mt-2 block"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(product.id)}
                  className="text-[#ff199c] mt-2 block"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-[#ff199c] mt-2 block"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsFormVisible(true)}
            className="mt-6 bg-[#ff199c] text-white p-2 rounded-md"
          >
            Add Product
          </button>
        </div>
      )}
      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default ProductManagement;
