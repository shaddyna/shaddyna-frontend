/*"use client";

import { useState } from "react";
import { ProfileSection } from "./ProfileSection";
import { ProfileInfoSection } from "@/components/profile/ProfileInfoSection";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminTable } from "@/components/profile/AdminTable";
import { OrderList } from "@/components/profile/OrderList";
import { SellerRequestsTab } from "@/components/profile/SellerRequestsTab"; // Import the SellerRequestsTab component

interface ProfileTabContentProps {
  activeTab: string;
  user: any;
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStartShopping: () => void;
  onEditAvatar: () => void;
  onAddUser: () => void;
  onAddProduct: () => void;
  onEditProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  onEditUser: (id: string) => void;
  onDeleteUser: (id: string) => void;
  onPageChange: (page: number) => void;
  onSearch: (term: string) => void;
  orders: any[];
  adminUsers: any[];
  formattedProducts: any[];
  pagination: any;
  isLoadingOrders: boolean;
  isLoadingUsers: boolean;
  loadingProducts: boolean;
  errorProducts: any;
}

export const ProfileTabContent = ({
  activeTab,
  user,
  formData,
  onInputChange,
  onSubmit,
  onStartShopping,
  onEditAvatar,
  onAddUser,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onEditUser,
  onDeleteUser,
  onPageChange,
  onSearch,
  orders,
  adminUsers,
  formattedProducts,
  pagination,
  isLoadingOrders,
  isLoadingUsers,
  loadingProducts,
  errorProducts,
}: ProfileTabContentProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const renderProfileTab = () => (
    <ProfileSection
      title="Personal Information"
      action={
        !isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit size={16} className="mr-2" /> Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>Save Changes</Button>
          </div>
        )
      }
    >
      {!isEditing ? (
        <ProfileInfoSection
          firstName={`${user.firstName} ${user.lastName}`}
          email={user.email}
          shippingAddress={{
            street: formData.shippingStreet,
            city: formData.shippingCity,
            state: formData.shippingState,
            zip: formData.shippingZip,
            country: formData.shippingCountry,
          }}
          billingAddress={{
            street: formData.billingStreet,
            city: formData.billingCity,
            state: formData.billingState,
            zip: formData.billingZip,
            country: formData.billingCountry,
          }}
        />
      ) : (
        <ProfileEditForm
          formData={formData}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </ProfileSection>
  );

  const renderOrdersTab = () => (
    <ProfileSection title="Your Orders">
      {isLoadingOrders ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f4b500]"></div>
        </div>
      ) : orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Button onClick={onStartShopping} className="mt-4">
            Start Shopping
          </Button>
        </div>
      )}
    </ProfileSection>
  );

  const renderSkillsTab = () => (
    <ProfileSection title="Your Skills">
      {isLoadingOrders ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f4b500]"></div>
        </div>
      ) : orders.length > 0 ? (
        <OrderList orders={orders}/>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Button onClick={onStartShopping} className="mt-4">
            Start Shopping
          </Button>
        </div>
      )}
    </ProfileSection>
  );

  const renderUsersTab = () => (
    <AdminTable
      title="User Management"
      columns={[
        {
          key: "name",
          label: "Name",
          render: (name: string) => (
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={20} className="text-gray-500" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{name}</div>
              </div>
            </div>
          ),
        },
        { key: "email", label: "Email" },
        {
          key: "role",
          label: "Role",
          render: (role: string) => (
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                role === "admin"
                  ? "bg-[#f4b500] text-black"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {role}
            </span>
          ),
        },
        { key: "joined", label: "Joined" },
        { key: "orders", label: "Orders" },
      ]}
      data={adminUsers}
      loading={isLoadingUsers}
      pagination={pagination}
      onPageChange={onPageChange}
      onSearch={onSearch}
      onAdd={onAddUser}
      onEdit={onEditUser}
      onDelete={onDeleteUser}
    />
  );

  const renderProductsTab = () => (
    <AdminTable
      title="Product Management"
      columns={[
        { key: "name", label: "Product" },
        { key: "designer", label: "Designer" },
        {
          key: "category",
          label: "Category",
          render: (category: string) => (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800">
              {category}
            </span>
          ),
        },
        {
          key: "price",
          label: "Price",
          render: (price: number) => `Ksh ${price.toFixed(2)}`,
        },
        { key: "stock", label: "Stock" },
      ]}
      data={formattedProducts}
      loading={loadingProducts}
      error={errorProducts}
      onAdd={onAddProduct}
      onEdit={onEditProduct}
      onDelete={onDeleteProduct}
    />
  );

  switch (activeTab) {
    case "profile":
      return renderProfileTab();
    case "orders":
      return renderOrdersTab();
    case "skills":
      return renderSkillsTab();
    case "seller-requests":
      return user.role === "admin" ? <SellerRequestsTab /> : null;
    case "users":
      return user.role === "admin" ? renderUsersTab() : null;
    case "products":
    return (user.role === "admin" || user.role === "seller") ? renderProductsTab() : null;  
    default:
      return null;
  }
};*/

import { useState } from "react";
import { ProfileSection } from "./ProfileSection";
import { ProfileInfoSection } from "@/components/profile/ProfileInfoSection";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminTable } from "@/components/profile/AdminTable";
import { OrderList } from "@/components/profile/OrderList";
import { SellerRequestsTab } from "@/components/profile/SellerRequestsTab"; // Import the SellerRequestsTab component
import ShopManagementTab from "./ShopManagement";

interface ProfileTabContentProps {
  activeTab: string;
  user: any;
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStartShopping: () => void;
  onEditAvatar: () => void;
  onAddUser: () => void;
  onAddProduct: () => void;
  onEditProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  onEditUser: (id: string) => void;
  onDeleteUser: (id: string) => void;
  onPageChange: (page: number) => void;
  onSearch: (term: string) => void;
  orders: any[];
  adminUsers: any[];
  formattedProducts: any[];
  pagination: any;
  isLoadingOrders: boolean;
  isLoadingUsers: boolean;
  loadingProducts: boolean;
  errorProducts: any;
}

export const ProfileTabContent = ({
  activeTab,
  user,
  formData,
  onInputChange,
  onSubmit,
  onStartShopping,
  onEditAvatar,
  onAddUser,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onEditUser,
  onDeleteUser,
  onPageChange,
  onSearch,
  orders,
  adminUsers,
  formattedProducts,
  pagination,
  isLoadingOrders,
  isLoadingUsers,
  loadingProducts,
  errorProducts,
}: ProfileTabContentProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const renderProfileTab = () => (
    <ProfileSection
      title="Personal Information"
      action={
        !isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="bg-white border border-[#bf2c7e] text-[#0f1c47] hover:bg-[#bf2c7e] hover:text-white"
          >
            <Edit size={16} className="mr-2 text-[#0f1c47]" /> Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="bg-white border border-[#bf2c7e] text-[#0f1c47] hover:bg-[#bf2c7e] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              className="bg-[#bf2c7e] text-white hover:bg-[#0f1c47]"
            >
              Save Changes
            </Button>
          </div>
        )
      }
    >
      {!isEditing ? (
        <ProfileInfoSection
          firstName={`${user.firstName} ${user.lastName}`}
          email={user.email}
          shippingAddress={{
            street: formData.shippingStreet,
            city: formData.shippingCity,
            state: formData.shippingState,
            zip: formData.shippingZip,
            country: formData.shippingCountry,
          }}
          billingAddress={{
            street: formData.billingStreet,
            city: formData.billingCity,
            state: formData.billingState,
            zip: formData.billingZip,
            country: formData.billingCountry,
          }}
        />
      ) : (
        <ProfileEditForm
          formData={formData}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </ProfileSection>
  );

    const renderShopTab = () => (
    <ProfileSection
      title="Personal Information"
      action={
        !isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="bg-white border border-[#bf2c7e] text-[#0f1c47] hover:bg-[#bf2c7e] hover:text-white"
          >
            <Edit size={16} className="mr-2 text-[#0f1c47]" /> Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="bg-white border border-[#bf2c7e] text-[#0f1c47] hover:bg-[#bf2c7e] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              className="bg-[#bf2c7e] text-white hover:bg-[#0f1c47]"
            >
              Save Changes
            </Button>
          </div>
        )
      }
    >
      {!isEditing ? (
        <ProfileInfoSection
          firstName={`${user.firstName} ${user.lastName}`}
          email={user.email}
          shippingAddress={{
            street: formData.shippingStreet,
            city: formData.shippingCity,
            state: formData.shippingState,
            zip: formData.shippingZip,
            country: formData.shippingCountry,
          }}
          billingAddress={{
            street: formData.billingStreet,
            city: formData.billingCity,
            state: formData.billingState,
            zip: formData.billingZip,
            country: formData.billingCountry,
          }}
        />
      ) : (
        <ProfileEditForm
          formData={formData}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </ProfileSection>
  );

  const renderOrdersTab = () => (
    <ProfileSection title="Your Orders">
      {isLoadingOrders ? (
        <div className="flex justify-center items-center py-10">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#bf2c7e]"
          ></div>
        </div>
      ) : orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <div className="text-center py-10">
          <p className="text-[#0f1c47]">You haven't placed any orders yet.</p>
          <Button
            onClick={onStartShopping}
            className="mt-4 bg-[#bf2c7e] text-white hover:bg-[#0f1c47]"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </ProfileSection>
  );

  const renderSkillsTab = () => (
    <ProfileSection title="Your Skills">
      {isLoadingOrders ? (
        <div className="flex justify-center items-center py-10">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#bf2c7e]"
          ></div>
        </div>
      ) : orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <div className="text-center py-10">
          <p className="text-[#0f1c47]">You haven't placed any orders yet.</p>
          <Button
            onClick={onStartShopping}
            className="mt-4 bg-[#bf2c7e] text-white hover:bg-[#0f1c47]"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </ProfileSection>
  );

  const renderUsersTab = () => (
    <AdminTable
      title="User Management"
      columns={[
        {
          key: "name",
          label: "Name",
          render: (name: string) => (
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#bf2c7e] flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-[#0f1c47]">{name}</div>
              </div>
            </div>
          ),
        },
        { key: "email", label: "Email" },
        {
          key: "role",
          label: "Role",
          render: (role: string) => (
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                role === "admin"
                  ? "bg-[#bf2c7e] text-white"
                  : "bg-[#0f1c47] text-white"
              }`}
            >
              {role}
            </span>
          ),
        },
        { key: "joined", label: "Joined" },
        { key: "orders", label: "Orders" },
      ]}
      data={adminUsers}
      loading={isLoadingUsers}
      pagination={pagination}
      onPageChange={onPageChange}
      onSearch={onSearch}
      onAdd={onAddUser}
      onEdit={onEditUser}
      onDelete={onDeleteUser}
    />
  );

  const renderProductsTab = () => (
    <AdminTable
      title="Product Management"
      columns={[
        { key: "name", label: "Product" },
        { key: "designer", label: "Designer" },
        {
          key: "category",
          label: "Category",
          render: (category: string) => (
            <span className="px-2 py-1 text-xs rounded-full bg-[#bf2c7e] text-white">
              {category}
            </span>
          ),
        },
        {
          key: "price",
          label: "Price",
          render: (price: number) => `Ksh ${price.toFixed(2)}`,
        },
        { key: "stock", label: "Stock" },
      ]}
      data={formattedProducts}
      loading={loadingProducts}
      error={errorProducts}
      onAdd={onAddProduct}
      onEdit={onEditProduct}
      onDelete={onDeleteProduct}
    />
  );

  switch (activeTab) {
    case "profile":
      return renderProfileTab();
    case "shop":
        return user.role === "seller" ? <ShopManagementTab user={user} /> : null;
    case "orders":
      return renderOrdersTab();
    case "skills":
      return renderSkillsTab();
    case "seller-requests":
      return user.role === "admin" ? <SellerRequestsTab /> : null;
    case "users":
      return user.role === "admin" ? renderUsersTab() : null;
    case "products":
      return (
        user.role === "admin" || user.role === "seller" ? renderProductsTab() : null
      );
    default:
      return null;
  }
};