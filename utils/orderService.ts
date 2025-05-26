import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

// Place a new order
const placeOrder = async (orderData: any, token: string) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const response = await axios.post(API_URL, { orderData }, config);
  return response.data;
};

// Get user's orders
const getMyOrders = async (token: string) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get order details
const getOrderDetails = async (orderId: string, token: string) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}/${orderId}`, config);
  return response.data;
};

const orderService = {
  placeOrder,
  getMyOrders,
  getOrderDetails
};

export default orderService;