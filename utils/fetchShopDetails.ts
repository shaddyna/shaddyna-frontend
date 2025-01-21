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

export const fetchProductsWithShopNames = async () => {
  try {
    // Fetch all products
    const { data: productsResponse } = await axios.get(
      `https://shaddyna-backend.onrender.com/api/products/all`
    );
    const { products: productsArray } = productsResponse;

    if (!Array.isArray(productsArray)) {
      throw new Error("Products response is not an array");
    }

    // Fetch all shops
    const { data: shopsResponse } = await axios.get(
      `https://shaddyna-backend.onrender.com/api/shops/shops`
    );
    const { shops: shopsArray } = shopsResponse;

    if (!Array.isArray(shopsArray)) {
      throw new Error("Shops response is not an array");
    }

    // Map sellerId to shop name
    const sellerIdToShopNameMap = shopsArray.reduce(
      (map, shop: { sellerId: string; name: string }) => {
        map[shop.sellerId] = shop.name;
        return map;
      },
      {} as Record<string, string>
    );

    // Attach shop names to products
    const productsWithShopNames = productsArray.map((product: { sellerId: string }) => ({
      ...product,
      shopName: sellerIdToShopNameMap[product.sellerId] || "Unknown Shop",
    }));

    return productsWithShopNames;
  } catch (error) {
    console.error("Error fetching products with shop names:", error);
    throw error;
  }
};
