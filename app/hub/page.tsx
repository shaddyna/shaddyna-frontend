"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesFilter from "@/components/services/ServicesFilter";
import ServiceCard from "@/components/services/ServiceCard";
import NoResults from "@/components/services/NoResults";
import BecomeProviderBanner from "@/components/services/BecomeProviderBanner";
import InquiryModal from "@/components/services/InquiryModal";
import { AdminPrompt, MembershipPrompt, PendingRequestPrompt, ErrorToast } from "@/components/services/Prompts";
import SkillForm from "@/components/services/CreateHubModal";
import { useServices } from "@/hooks/useServices";


const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedServiceLevel, setSelectedServiceLevel] = useState<string[]>([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string[]>([]);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const [error, setError] = useState('');
  const [showPendingRequestPrompt, setShowPendingRequestPrompt] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showMembershipPrompt, setShowMembershipPrompt] = useState(false);
  const [isCreateMemberModalOpen, setIsCreateMemberModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    timeline: ""
  });

  const { services, loading: servicesLoading, error: servicesError } = useServices();

  // Categories from the actual services data
  const categories = [
    "All Categories",
    ...Array.from(new Set(services.map(service => service.category)))
  ];

  const serviceLevels = [
    { name: "Basic", value: "basic" },
    { name: "Standard", value: "standard" },
    { name: "Premium", value: "premium" },
    { name: "Enterprise", value: "enterprise" }
  ];

  const deliveryTimes = [
    { name: "Under 1 week", value: "1week" },
    { name: "1-2 weeks", value: "2weeks" },
    { name: "2-4 weeks", value: "4weeks" },
    { name: "1+ month", value: "1month" }
  ];

  const handleOpenCreateMemberModal = () => {
    setIsCreateMemberModalOpen(true);
  };

  const handleCloseCreateMemberModal = () => {
    setIsCreateMemberModalOpen(false);
  };

  const checkExistingRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/membership/check`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to check requests');
      }
  
      const data = await response.json();
      return data.hasPendingRequest;
    } catch (err) {
      console.error('Error checking requests:', err);
      setError('Failed to check your membership status');
      return false;
    }
  };


  const handleCreateHubClick = async () => { 
  if (authLoading) return;

  setChecking(true);
  setError('');

  try {
    await refreshUser();

    if (!user) {
      console.log("User not logged in");
      // Optional: Show login modal
      return;
    }

    if (!user.member) {
  console.log("User is not a member:", user); // 🔍 Confirm this
  setShowMembershipPrompt(true);
} else {
  handleOpenCreateMemberModal();
}


    const hasPendingRequest = await checkExistingRequest();
    if (hasPendingRequest) {
      setShowPendingRequestPrompt(true);
      return;
    }

    // Check membership status
    if (!user.member) {
      setShowMembershipPrompt(true); // Prompt to become a member
    } else {
      handleOpenCreateMemberModal(); // Proceed if member
    }

  } catch (error) {
    console.error('Error checking user status:', error);
    setError('An error occurred while checking your status');
  } finally {
    setChecking(false);
  }
};


  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id);
  };

  const handleContinueClick = (service: any) => {
    setSelectedService(service);
    setIsInquiryOpen(true);
    setFormData(prev => ({
      ...prev,
      budget: service.price ? `$${service.price}` : 'Custom',
      timeline: service.deliveryTime
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inquiry submitted:', formData);
    setIsInquiryOpen(false);
    setFormData({
      name: "",
      email: "",
      message: "",
      budget: "",
      timeline: ""
    });
    alert('Your inquiry has been sent successfully!');
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedServiceLevel([]);
    setSelectedDeliveryTime([]);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      //(service.user?.firstName && service.user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      //(service.user?.lastName && service.user.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" ||
      service.category === selectedCategory;
    
    // Simple price-based filtering - you might want to enhance this
    const matchesServiceLevel = selectedServiceLevel.length === 0 ||
      (service.price < 100 && selectedServiceLevel.includes("basic")) ||
      (service.price >= 100 && service.price < 500 && selectedServiceLevel.includes("standard")) ||
      (service.price >= 500 && service.price < 1000 && selectedServiceLevel.includes("premium")) ||
      (service.price >= 1000 && selectedServiceLevel.includes("enterprise"));
    
    // Simple delivery time filtering - you might want to enhance this
    const matchesDeliveryTime = selectedDeliveryTime.length === 0 ||
      (service.deliveryTime.includes("24h") && selectedDeliveryTime.includes("1week")) ||
      (service.deliveryTime.includes("3d") && selectedDeliveryTime.includes("2weeks")) ||
      (service.deliveryTime.includes("1w") && selectedDeliveryTime.includes("4weeks")) ||
      (service.deliveryTime.includes("1m") && selectedDeliveryTime.includes("1month"));

    return matchesSearch && matchesCategory && matchesServiceLevel && matchesDeliveryTime;
  });

  if (servicesLoading) {
    return (
      <div className="bg-white min-h-screen">
        <NavbarTwo />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
        </div>
        <LuxuryFooter />
      </div>
    );
  }

  if (servicesError) {
    return (
      <div className="bg-white min-h-screen">
        <NavbarTwo />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error loading services</h2>
            <p className="text-gray-600">{servicesError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#bf2c7e] text-white rounded-lg hover:bg-[#0f1c47] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <LuxuryFooter />
      </div>
    );
  }

  return (
    <>
     <NavbarTwo />
    <div className="bg-white min-h-screen">
     

      <ServicesHero 
        handleCreateSkillClick={handleCreateHubClick} 
        checking={checking} 
        authLoading={authLoading} 
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ServicesFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedServiceLevel={selectedServiceLevel}
          setSelectedServiceLevel={setSelectedServiceLevel}
          selectedDeliveryTime={selectedDeliveryTime}
          setSelectedDeliveryTime={setSelectedDeliveryTime}
          categories={categories}
          serviceLevels={serviceLevels}
          deliveryTimes={deliveryTimes}
        />

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                activeService={activeService}
                toggleService={toggleService}
                handleContinueClick={handleContinueClick}
              />
            ))}
          </div>
        ) : (
          <NoResults resetFilters={resetFilters} />
        )}
      </section>

      <BecomeProviderBanner 
        handleCreateSkillClick={handleCreateHubClick} 
        checking={checking} 
        authLoading={authLoading} 
      />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        service={selectedService}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />

      {/* Prompt Modals */}
      {showAdminPrompt && (
        <AdminPrompt onClose={() => setShowAdminPrompt(false)} />
      )}

      {showMembershipPrompt && (
        <MembershipPrompt onClose={() => setShowMembershipPrompt(false)} />
      )}

      {showPendingRequestPrompt && (
        <PendingRequestPrompt onClose={() => setShowPendingRequestPrompt(false)} />
      )}

      {error && (
        <ErrorToast error={error} onClose={() => setError('')} />
      )}

      <SkillForm
        isOpen={isCreateMemberModalOpen}
        onClose={handleCloseCreateMemberModal}
      />
  
      <LuxuryFooter />
    </div>
    </>
  );
};

export default ServicesPage;