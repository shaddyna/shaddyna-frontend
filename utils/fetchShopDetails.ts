import axios from "axios";

export const fetchShopDetails = async (shopId: string) => {
  try {
    console.log("Fetching shop details for shopId:", shopId);

    // Fetch shop details
    const { data: shopResponse } = await axios.get(
      `https://shaddyna-backend.onrender.com/api/shops/${shopId}`
    );
    console.log("Shop Response:", shopResponse);

    const { shop: shopData, reviews } = shopResponse;
    const sellerId = shopData?.sellerId?._id || shopData?.sellerId;

    // Fetch all products
    const { data: productsResponse } = await axios.get(
      `https://shaddyna-backend.onrender.com/api/products/all`
    );
    console.log("Products Response:", productsResponse);

    const { products: productsArray } = productsResponse;

    // Check if productsArray is an array
    if (!Array.isArray(productsArray)) {
      throw new Error("Products response is not an array");
    }

    // Filter products by sellerId
    const shopProducts = productsArray.filter(
      (product: { sellerId: { toString: () => any } }) =>
        product.sellerId?.toString() === sellerId?.toString()
    );
    console.log("Filtered Shop Products:", shopProducts);

    return { shop: shopData, reviews, products: shopProducts }; // Return the shop data and products
  } catch (error) {
    console.error("Error fetching shop details:", error);
    throw error;
  }
};
