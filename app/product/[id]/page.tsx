"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { ProductDetail, MiniCartItem } from "@/types/products";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { ProductDetails } from "@/components/products/ProductDetails";
import { RelatedProducts } from "@/components/products/RelatedProducts";
//import { MiniCart } from "@/components/cart/MiniCart";
import Snackbar from "@/components/SnackBar";
import Footer from "@/components/Footer";
import Back from "@/components/Back";
import { MiniCart } from "@/components/cart/MiniCart";

const ProductDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  // ... keep all the state and effects from original code ...

  const { id: productId } = params;
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<ProductDetail[]>([]);
  const [miniCartItems, setMiniCartItems] = useState<MiniCartItem[]>([]);
  const [showMiniCart, setShowMiniCart] = useState(false);

//  const [showMiniCart, setShowMiniCart] = useState(false); // State to control mini cart visibility

  //const toggleMiniCart = () => setShowMiniCart((prev) => !prev);
  const closeMiniCart = () => setShowMiniCart(false); //

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
        const response = await fetch(
          `https://shaddyna-backend.onrender.com/api/products/related/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch related products");

        const data = await response.json();
        
        // Properly format related products
        const formattedRelated: ProductDetail[] = data.relatedProducts.map(
          (rp: any) => ({
            id: rp._id,
            name: rp.name,
            description: rp.description || "No Description Available",
            price: rp.price,
            images: rp.images || ["/default-image.jpg"],
            rating: rp.rating || 0,
            stock: rp.stock,
            category: rp.category,
            attributes: rp.attributes || {},
          })
        );
        setRelatedProducts(formattedRelated);
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


  const addToMiniCart = (product: ProductDetail) => {
    setMiniCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price, // Now using the actual product's price
          image: product.images[0],
          quantity: 1,
        },
      ];
    });
    setShowMiniCart(true);
  };

  

  const removeFromMiniCart = (productId: string) => {
    setMiniCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, amount: number) => {
    setMiniCartItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const submitMiniCart = () => {
    miniCartItems.forEach(item => {
      addToCart({
        _id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        stock: product?.stock || 0,
        color: "",
        sellerId: "",
        shelfId: ""
      });
    });
    setMiniCartItems([]);
    setSnackbarMessage(`${miniCartItems.length} items added to main cart!`);
  };

  if (!product) return <div className="text-center p-10">Loading...</div>;

  return (
    <div>
      <Back title="Product Details" />
      <div className="bg-gray-50 min-h-screen flex flex-col p-3">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <ProductImageGallery
            images={product.images}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />

          <ProductDetails
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        </div>

        <RelatedProducts
          relatedProducts={relatedProducts}
          currentProductAttributes={product.attributes}
          onAddToMiniCart={addToMiniCart}
        />

        {snackbarMessage && (
          <Snackbar
            message={snackbarMessage}
            onClose={() => setSnackbarMessage("")}
          />
        )}
          {/* Mini Cart Component - Only Renders When showMiniCart is True */}
      {showMiniCart && (
        <MiniCart
          items={miniCartItems}
          onRemove={removeFromMiniCart}
          onQuantityChange={updateQuantity}
          onSubmit={submitMiniCart}
          onClose={closeMiniCart} // Implemented properly
        />
      )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
{/*"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaShoppingCart, FaHeart, FaPlus, FaMinus } from "react-icons/fa";
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

interface MiniCartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const MiniCart = ({
  items,
  onRemove,
  onQuantityChange,
  onSubmit,
}: {
  items: MiniCartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, amount: number) => void;
  onSubmit: () => void;
}) => (
  <div className="fixed right-4 bottom-20 bg-white rounded-lg shadow-xl p-4 w-80 max-h-[60vh] overflow-y-auto border border-gray-100 z-50">
    <h3 className="text-lg font-bold mb-4">Mini Cart</h3>
    {items.length === 0 ? (
      <p className="text-gray-500 text-center">Your mini cart is empty</p>
    ) : (
      <>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{item.name}</h4>
              <p className="text-gray-600">Kes {item.price}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => onQuantityChange(item.id, -1)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => onQuantityChange(item.id, 1)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold mb-4">
            <span>Total:</span>
            <span>
              Kes{" "}
              {items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
            </span>
          </div>
          <button
            onClick={onSubmit}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add All to Cart
          </button>
        </div>
      </>
    )}
  </div>
);

const ProductDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id: productId } = params;
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<ProductDetail[]>([]);
  const [miniCartItems, setMiniCartItems] = useState<MiniCartItem[]>([]);
  const [showMiniCart, setShowMiniCart] = useState(false);

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
        const response = await fetch(
          `https://shaddyna-backend.onrender.com/api/products/related/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch related products");

        const data = await response.json();
        
        // Properly format related products
        const formattedRelated: ProductDetail[] = data.relatedProducts.map(
          (rp: any) => ({
            id: rp._id,
            name: rp.name,
            description: rp.description || "No Description Available",
            price: rp.price,
            images: rp.images || ["/default-image.jpg"],
            rating: rp.rating || 0,
            stock: rp.stock,
            category: rp.category,
            attributes: rp.attributes || {},
          })
        );
        setRelatedProducts(formattedRelated);
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


  const addToMiniCart = (product: ProductDetail) => {
    setMiniCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price, // Now using the actual product's price
          image: product.images[0],
          quantity: 1,
        },
      ];
    });
    setShowMiniCart(true);
  };

  

  const removeFromMiniCart = (productId: string) => {
    setMiniCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, amount: number) => {
    setMiniCartItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const submitMiniCart = () => {
    miniCartItems.forEach(item => {
      addToCart({
        _id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        stock: product?.stock || 0,
        color: "",
        sellerId: "",
        shelfId: ""
      });
    });
    setMiniCartItems([]);
    setSnackbarMessage(`${miniCartItems.length} items added to main cart!`);
  };

  if (!product) return <div className="text-center p-10">Loading...</div>;

  return (
    <div>
      <Back title="Product Details" />
      <div className="bg-gray-50 min-h-screen flex flex-col p-3">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
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
                  } rounded-lg object-cover`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

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

            {product.attributes && Object.entries(product.attributes).length > 0 ? (
              <ul className="mt-2 text-gray-600">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <li key={key} className="capitalize">
                    <b>{key}:</b> {value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No attributes available.</p>
            )}

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

        <div className="bg-white mt-3">
          <h2 className="text-2xl font-bold px-3">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4 px-3">
            {relatedProducts.map((related) => {
              const matchingAttributes = related.attributes
                ? Object.entries(related.attributes).filter(
                    ([key, value]) => product?.attributes?.[key] === value
                  )
                : [];
              return (
                <div key={related.id} className="border p-4 rounded-lg shadow">
                  <img
                    src={related.images[0]}
                    alt={related.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2">{related.name}</h3>
                  <p className="text-gray-600">Kes {related.price}</p>
                  {matchingAttributes.length > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Matches:
                      {matchingAttributes.map(([key, value]) => (
                        <span key={key} className="ml-1 text-gray-600 font-semibold">
                          {key}: {value}
                        </span>
                      ))}
                    </p>
                  )}
                  <button
                    onClick={() => addToMiniCart(related)}
                    className="mt-2 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                  >
                    Add to Mini Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {snackbarMessage && (
          <Snackbar
            message={snackbarMessage}
            onClose={() => setSnackbarMessage("")}
          />
        )}

        {showMiniCart && (
          <MiniCart
            items={miniCartItems}
            onRemove={removeFromMiniCart}
            onQuantityChange={updateQuantity}
            onSubmit={submitMiniCart}
          />
        )}

        <button
          onClick={() => setShowMiniCart(!showMiniCart)}
          className="fixed right-4 bottom-28 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-40"
        >
          <FaShoppingCart size={24} />
          {miniCartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {miniCartItems.length}
            </span>
          )}
        </button>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ProductDetailPage;*/}