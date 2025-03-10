/*"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Snackbar from "@/components/SnackBar";
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";
import Back from "@/components/Back";

interface ProductDetail {
  shelfId: any;
  sellerId: string;
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  stock: number;
}

const ProductDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id: productId } = params;
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `https://shaddyna-backend.onrender.com/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
  
        const data = await response.json();
        console.log("Raw response data from backend:", data);
  
        // Transform the raw product data
        const formattedProduct: ProductDetail = {
          id: data.product._id || "N/A",
          name: data.product.name || "No Name Provided",
          description: data.product.description || "No Description Available",
          price: data.product.price || 0,
          image: data.product.images?.[0] || "/default-image.jpg", // Use the first image or a placeholder
          rating: data.product.rating || 0,
          stock: data.product.stock || 0, // If the stock property exists in the backend, handle it here
          sellerId: data.product.sellerId || "not provided",
          shelfId: data.product.shelfId || "not provided"
        };
  
        setProduct(formattedProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Error fetching product details. Please try again.");
      }
    };
  
    if (productId) fetchProductDetail();
  }, [productId]);
  

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <AiFillStar key={i} className="text-yellow-400" />
        ))}
        {halfStar && <AiFillStar className="text-yellow-400" />}
        {Array.from(
          { length: 5 - fullStars - (halfStar ? 1 : 0) },
          (_, i) => (
            <AiOutlineStar key={i} className="text-gray-300" />
          )
        )}
      </>
    );
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      _id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      color: "default", // Placeholder for color
      stock: product.stock,
      sellerId: product.sellerId, // Placeholder for sellerId
      shelfId: product.shelfId,
    };

    addToCart(cartItem);
    setSnackbarMessage("Product added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!product) return;
  
    const wishlistItem = {
      _id: product.id,
      name: product.name,
      price: product.price,
      images: [product.image], // Convert the single image to an array
      rating: product.rating,
    };
  
    addToWishlist(wishlistItem);
    setSnackbarMessage("Product added to wishlist!");
  };

  if (!product) {

    return <div className="bg-gray-50 min-h-screen flex flex-col">
      <p className="text-center text-gray-600 mt-10">Loading product details...</p>;
      </div>
  }

  return (
    <div>
      <Back title={"Product details"} />
      <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-36 sm:h-48 object-contain" 
            //className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-500 mt-2">{product.description}</p>
            <p className="text-xl font-bold text-gray-800 mt-4">
              Kes {product.price}
            </p>
            <div className="flex items-center mt-4">
              {renderStars(product.rating)}
            </div>
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-[#182155] text-white py-2 px-4 rounded-md font-bold flex items-center gap-2 hover:bg-yellow-500 transition"
              >
                <FaShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="bg-pink-500 text-white py-2 px-4 rounded-md font-bold flex items-center gap-2 hover:bg-red-600 transition"
              >
                <FaHeart />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        {snackbarMessage && (
          <Snackbar
            message={snackbarMessage}
            onClose={() => setSnackbarMessage("")}
          />
        )}
      </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ProductDetailPage;*/



"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Snackbar from "@/components/SnackBar";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";
import Back from "@/components/Back";

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  stock: number;
  category: string;
  attributes: Record<string, string>;
}

const ProductDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id: productId } = params;
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<ProductDetail[]>([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `https://shaddyna-backend.onrender.com/api/products/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch product details");
        
        const data = await response.json();
        const formattedProduct: ProductDetail = {
          id: data.product._id,
          name: data.product.name,
          description: data.product.description || "No Description Available",
          price: data.product.price,
          images: data.product.images || ["/default-image.jpg"],
          rating: data.product.rating || 0,
          stock: data.product.stock,
          category: data.product.category,
          attributes: data.product.attributes || {},
        };

        setProduct(formattedProduct);
        setSelectedImage(formattedProduct.images[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) fetchProductDetail();
  }, [productId]);

  
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/related/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch related products");

        const data = await response.json();
        setRelatedProducts(data.relatedProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (productId) fetchRelatedProducts();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: selectedImage,
      stock: product.stock,
      color: "",
      sellerId: "",
      shelfId: ""
    });
    setSnackbarMessage("Product added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    addToWishlist({
      _id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      rating: product.rating,
    });
    setSnackbarMessage("Product added to wishlist!");
  };

  if (!product) return <div className="text-center p-10">Loading...</div>;

  return (
    <div>
      <Back title="Product Details" />
      <div className="bg-gray-50 min-h-screen flex flex-col p-3">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div>
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
            <div className="flex gap-2 mt-4">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`w-16 h-16 cursor-pointer border-2 ${
                    selectedImage === img ? "border-blue-500" : "border-gray-300"
                  } rounded-lg object-cover"`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-500 mt-2">{product.description}</p>
            <p className="text-xl font-bold text-gray-800 mt-4">Kes {product.price}</p>
            <div className="flex items-center gap-2 mt-2">
              {[...Array(5)].map((_, i) => (
                i < product.rating ? (
                  <AiFillStar key={i} className="text-yellow-400" />
                ) : (
                  <AiOutlineStar key={i} className="text-gray-300" />
                )
              ))}
            </div>

            {/* Attributes */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Specifications:</h2>
              <ul className="mt-2 text-gray-600">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <li key={key} className="capitalize"><b>{key}:</b> {value}</li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition"
              >
                <FaShoppingCart /> Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="bg-pink-500 text-white py-2 px-4 rounded-lg font-bold flex items-center gap-2 hover:bg-red-600 transition"
              >
                <FaHeart /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        {snackbarMessage && (
          <Snackbar message={snackbarMessage} onClose={() => setSnackbarMessage("")} />
        )}
      </div>
         {/* Related Products Section */}
       <div className="mt-3">
        <h2 className="text-2xl font-bold  px-3">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4 px-3">
          {relatedProducts.map((related) => {
            const matchingAttributes = Object.entries(related.attributes).filter(
              ([key, value]) => product?.attributes[key] === value
            );
            return (
              <div key={related.id} className="border p-4 rounded-lg shadow">
                <img src={related.images[0]} alt={related.name} className="w-full h-40 object-cover rounded" />
                <h3 className="text-lg font-semibold mt-2">{related.name}</h3>
                <p className="text-gray-600">Kes {related.price}</p>
                {matchingAttributes.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Matches:
                    {matchingAttributes.map(([key, value]) => (
                      <span key={key} className="ml-1 font-semibold">
                        {key}: {value}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ProductDetailPage;



/*"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  images: string[];
  attributes: Record<string, string>;
}

const ProductDetailPage: React.FC = () => {
  const { id: productId } = useParams() as { id: string };
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductDetail[]>([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) fetchProductDetail();
  }, [productId]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/related/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch related products");

        const data = await response.json();
        setRelatedProducts(data.relatedProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (productId) fetchRelatedProducts();
  }, [productId]);

  return (
    <div>
      {/* Product Details Section *
      {product && (
        <div>
          <h1>{product.name}</h1>
          <p>Price: Kes {product.price}</p>
          <img src={product.images[0]} alt={product.name} className="w-64 h-64" />
        </div>
      )}

       {/* Related Products Section *
       <div className="mt-10">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {relatedProducts.map((related) => {
            const matchingAttributes = Object.entries(related.attributes).filter(
              ([key, value]) => product?.attributes[key] === value
            );
            return (
              <div key={related.id} className="border p-4 rounded-lg shadow">
                <img src={related.images[0]} alt={related.name} className="w-full h-40 object-cover rounded" />
                <h3 className="text-lg font-semibold mt-2">{related.name}</h3>
                <p className="text-gray-600">Kes {related.price}</p>
                {matchingAttributes.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Matches:
                    {matchingAttributes.map(([key, value]) => (
                      <span key={key} className="ml-1 font-semibold">
                        {key}: {value}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;*/