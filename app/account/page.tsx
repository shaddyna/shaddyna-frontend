"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import useProducts from "@/utils/useProducts";
import { ProfileLayout } from "@/components/account/ProfileLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileTabContent } from "@/components/account/ProfileTabContent";
import { ProductModal } from "@/components/profile/ProductModal";


const ProfilePage = () => {
  const { user, isLoading, token, logout, refreshUser } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "",
  });

  const { products, loading: loadingProducts, error: errorProducts } = useProducts();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/auth/login");
    }

    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        shippingStreet: "",
        shippingCity: "",
        shippingState: "",
        shippingZip: "",
        shippingCountry: "",
        billingStreet: "",
        billingCity: "",
        billingState: "",
        billingZip: "",
        billingCountry: "",
      });

      if (activeTab === "orders" && user) {
        loadOrders();
      }

      if (activeTab === "users" && user?.role === "admin") {
        loadUsers();
      }
    }
  }, [user, activeTab]);

  const loadOrders = async () => {
    setIsLoadingOrders(true);
    try {
      // API call to fetch orders
      setOrders([]);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const loadUsers = async (page = 1, limit = 10, search = "") => {
    setIsLoadingUsers(true);
    try {
      if (!token) throw new Error("No authentication token available");

      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${page}&limit=${limit}`;
      if (search) url += `&search=${search}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          await refreshUser();
          return loadUsers(page, limit, search);
        }
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setAdminUsers(data.data);
        setPagination({
          page: data.currentPage,
          limit,
          total: data.total,
          pages: data.pages,
        });
      }
    } catch (error) {
      console.error("Error loading users:", error);
      if (
        error instanceof Error &&
        (error.message.includes("401") || error.message.includes("Unauthorized"))
      ) {
        logout();
        router.push("/login");
      }
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    loadUsers(newPage, pagination.limit);
  };

  const handleSearch = (searchTerm: string) => {
    loadUsers(1, pagination.limit, searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call to update profile
      //setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleStartShopping = () => {
    router.push("/collections");
  };

  const handleEditAvatar = () => {
    console.log("Edit avatar clicked");
  };

  const handleAddUser = () => {
    console.log("Add user clicked");
  };

  const handleAddProduct = () => {
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (productId: string) => {
    console.log("Editing product:", productId);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete product");
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditUser = (userId: string) => {
    console.log("Editing user:", userId);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to delete user");
      loadUsers(pagination.page, pagination.limit);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleProductAdded = (newProduct: any) => {
    console.log("New product added:", newProduct);
  };

  const formattedProducts = products.map((product: any) => ({
    id: product._id,
    name: product.name,
    designer: product.designer,
    category: `${product.category.main}`,
    price: product.price,
    stock: product.stock,
    rawData: product,
  }));

  const formattedUsers = adminUsers.map((user) => ({
    id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    joined: new Date(user.createdAt).toLocaleDateString(),
    orders: user.orderCount || 0,
    rawData: user,
  }));

  if (isLoading || !user) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
      </div>
    );
  }

  return (
    <ProfileLayout>
      <ProfileHeader
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        avatar={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=82cee4&color=fff`}
        joinedDate={new Date(user.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}
        role={user.role}
        onEditAvatar={handleEditAvatar}
      />

    <ProfileTabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isAdmin={user.role === "admin"}
      isSeller={user.role === "seller"}
      isMember={user.member === true}
    />
      <ProfileTabContent
        activeTab={activeTab}
        user={user}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onStartShopping={handleStartShopping}
        onEditAvatar={handleEditAvatar}
        onAddUser={handleAddUser}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        orders={orders}
        adminUsers={formattedUsers}
        formattedProducts={formattedProducts}
        pagination={pagination}
        isLoadingOrders={isLoadingOrders}
        isLoadingUsers={isLoadingUsers}
        loadingProducts={loadingProducts}
        errorProducts={errorProducts}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddProduct={handleProductAdded}
      />
    </ProfileLayout>
  );
};

export default ProfilePage;