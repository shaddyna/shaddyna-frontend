/*"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { ProductDetail, MiniCartItem } from "@/types/products";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { ProductDetails } from "@/components/products/ProductDetails";
import { RelatedProducts } from "@/components/products/RelatedProducts";
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
          {/* Mini Cart Component - Only Renders When showMiniCart is True *
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

export default ProductDetailPage;*/

"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { ProductDetail, MiniCartItem } from "@/types/products";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { ProductDetails } from "@/components/products/ProductDetails";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import Snackbar from "@/components/SnackBar";
import Footer from "@/components/Footer";
import Back from "@/components/Back";
import { MiniCart } from "@/components/cart/MiniCart";

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

  // Fetch product details and related products (keep existing useEffect hooks)

  const handleAddToCart = (quantity: number = 1) => {
    if (!product) return;
    addToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: selectedImage,
      stock: product.stock,
      color: "",
      sellerId: "",
      shelfId: ""
    });
    setSnackbarMessage(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart!`);
  };

  const handleBulkAddToCart = (bulkQuantity: number) => {
    if (!product) return;
    addToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      quantity: bulkQuantity,
      image: selectedImage,
      stock: product.stock,
      color: "",
      sellerId: "",
      shelfId: ""
    });
    setSnackbarMessage(`${bulkQuantity} items added to cart!`);
  };

  // Keep existing wishlist, mini cart, and other handlers
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
            images={product?.images || []}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />

          {product && (
            <ProductDetails
              product={product}
              onAddToCart={handleAddToCart}
              onBulkAddToCart={handleBulkAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          )}
        </div>

        <RelatedProducts
          relatedProducts={relatedProducts}
          currentProductAttributes={product?.attributes || {}}
          onAddToMiniCart={addToMiniCart}
        />

        {/* Keep existing snackbar and mini cart components */}
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