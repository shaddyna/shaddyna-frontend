/*import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import{ ProfileSection }from '@/components/account/ProfileSection';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type WorkingHours = {
  open: string;
  close: string;
  closed: boolean;
};

type Shop = {
  name: string;
  description: string;
  location: string;
  categories: string[];
  image: string;
  contact: {
    email: string;
    phone: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
  workingHours: {
    monday: WorkingHours;
    tuesday: WorkingHours;
    wednesday: WorkingHours;
    thursday: WorkingHours;
    friday: WorkingHours;
    saturday: WorkingHours;
    sunday: WorkingHours;
    [key: string]: WorkingHours;
  };
  policies: {
    returnPolicy: string;
    shippingPolicy: string;
  };
};

type ShopManagementTabProps = {
  user: any;
};

const ShopManagementTab = ({ user }: ShopManagementTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shop, setShop] = useState<Shop | null>(null);
  const [formData, setFormData] = useState<Shop>({
    name: '',
    description: '',
    location: '',
    categories: [],
    image: '',
    contact: {
      email: '',
      phone: '',
      instagram: '',
      facebook: '',
      twitter: ''
    },
    workingHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    policies: {
      returnPolicy: '',
      shippingPolicy: ''
    }
  });

  const categoryOptions = [
    'fashion', 'home', 'art', 'jewelry', 
    'beauty', 'electronics', 'food', 'other'
  ];

useEffect(() => {
  const fetchShop = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shops/my-shop', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Fetched shop data:', response.data.data); // Just the inner shop object

      setShop(response.data.data);
      setFormData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching shop:', error);
      setIsLoading(false);
    }
  };

  fetchShop();
}, []);



  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

interface OnCategoryChange {
    (category: string): void;
}

const onCategoryChange: OnCategoryChange = (category) => {
    setFormData(prev => {
        const newCategories = prev.categories.includes(category)
            ? prev.categories.filter((c: string) => c !== category)
            : [...prev.categories, category];

        return {
            ...prev,
            categories: newCategories
        };
    });
};

interface OnWorkingHoursChange {
    (day: keyof Shop['workingHours'], field: keyof WorkingHours, value?: string): void;
}

const onWorkingHoursChange: OnWorkingHoursChange = (day, field, value) => {
    setFormData(prev => ({
        ...prev,
        workingHours: {
            ...prev.workingHours,
            [day]: {
                ...prev.workingHours[day],
                [field]: field === 'closed' ? !prev.workingHours[day].closed : value
            }
        }
    }));
};

interface OnSubmitEvent extends React.FormEvent<HTMLFormElement> {}

interface ApiResponse {
    data: Shop;
}

const onSubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();
    try {
        const response: ApiResponse = await axios.put('/api/shops/my-shop', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setShop(response.data);
        setIsEditing(false);
        toast.success('Shop updated successfully!');
    } catch (error) {
        console.error('Error updating shop:', error);
        toast.error('Failed to update shop');
    }
};

  if (isLoading) {
    return <div>Loading shop information...</div>;
  }

  if (!shop) {
    return (
      <ProfileSection title="Shop Management">
        <div className="p-4 text-center">
          <p className="mb-4">You don't have a shop yet.</p>
          <Button className="bg-[#bf2c7e] text-white hover:bg-[#0f1c47]">
            Create a Shop
          </Button>
        </div>
      </ProfileSection>
    );
  }

  return (
    <ProfileSection
      title="Shop Management"
      action={
        !isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="bg-white border border-[#bf2c7e] text-[#0f1c47] hover:bg-[#bf2c7e] hover:text-white"
          >
            <Edit size={16} className="mr-2 text-[#0f1c47]" /> Edit Shop
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
              type="submit"
              className="bg-[#bf2c7e] text-white hover:bg-[#0f1c47]"
            >
              Save Changes
            </Button>
          </div>
        )
      }
    >
      {!isEditing ? (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{shop.name}</h3>
            <p className="text-gray-600">{shop.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium">Location</h4>
            <p>{shop.location}</p>
          </div>
          
          <div>
            <h4 className="font-medium">Categories</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {shop.categories.map(category => (
                <span key={category} className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium">Contact Information</h4>
            <p>Email: {shop.contact.email}</p>
            {shop.contact.phone && <p>Phone: {shop.contact.phone}</p>}
            {shop.contact.instagram && <p>Instagram: {shop.contact.instagram}</p>}
            {shop.contact.facebook && <p>Facebook: {shop.contact.facebook}</p>}
            {shop.contact.twitter && <p>Twitter: {shop.contact.twitter}</p>}
          </div>
          
          <div>
            <h4 className="font-medium">Working Hours</h4>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {Object.entries(shop.workingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="capitalize">{day}:</span>
                  {hours.closed ? (
                    <span className="text-gray-500">Closed</span>
                  ) : (
                    <span>{hours.open} - {hours.close}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Shop Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              maxLength={100}
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              maxLength={500}
              rows={4}
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    formData.categories.includes(category)
                      ? 'bg-[#bf2c7e] text-white border-[#bf2c7e]'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Contact Email</label>
            <input
              type="email"
              name="contact.email"
              value={formData.contact.email}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Contact Phone</label>
            <input
              type="tel"
              name="contact.phone"
              value={formData.contact.phone}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <h4 className="mb-2 font-medium">Social Media</h4>
            <div className="space-y-4">
              <input
                type="text"
                name="contact.instagram"
                value={formData.contact.instagram}
                onChange={onInputChange}
                placeholder="Instagram"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="contact.facebook"
                value={formData.contact.facebook}
                onChange={onInputChange}
                placeholder="Facebook"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="contact.twitter"
                value={formData.contact.twitter}
                onChange={onInputChange}
                placeholder="Twitter"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div>
            <h4 className="mb-2 font-medium">Working Hours</h4>
            <div className="space-y-4">
              {Object.entries(formData.workingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between">
                  <label className="capitalize w-24">{day}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hours.closed}
                      onChange={() => onWorkingHoursChange(day, 'closed')}
                      className="mr-2"
                    />
                    <span>Closed</span>
                  </div>
                  {!hours.closed && (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => onWorkingHoursChange(day, 'open', e.target.value)}
                        className="p-1 border rounded"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => onWorkingHoursChange(day, 'close', e.target.value)}
                        className="p-1 border rounded"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="mb-2 font-medium">Shop Policies</h4>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Return Policy</label>
                <textarea
                  name="policies.returnPolicy"
                  value={formData.policies.returnPolicy}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              <div>
                <label className="block mb-1">Shipping Policy</label>
                <textarea
                  name="policies.shippingPolicy"
                  value={formData.policies.shippingPolicy}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </ProfileSection>
  );
};

export default ShopManagementTab;*/

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Clock, MapPin, Mail, Phone, Instagram, Facebook, Twitter, X } from 'lucide-react';
import { ProfileSection } from '@/components/account/ProfileSection';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Skeleton } from '@/components/ui/Skeleton';    
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/TextArea';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';

type WorkingHours = {
  open: string;
  close: string;
  closed: boolean;
};

type Shop = {
  name: string;
  description: string;
  location: string;
  categories: string[];
  image: string;
  contact: {
    email: string;
    phone: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
  workingHours: {
    monday: WorkingHours;
    tuesday: WorkingHours;
    wednesday: WorkingHours;
    thursday: WorkingHours;
    friday: WorkingHours;
    saturday: WorkingHours;
    sunday: WorkingHours;
    [key: string]: WorkingHours;
  };
  policies: {
    returnPolicy: string;
    shippingPolicy: string;
  };
};

type ShopManagementTabProps = {
  user: any;
};

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

const ShopManagementTab = ({ user }: ShopManagementTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shop, setShop] = useState<Shop | null>(null);
  const [formData, setFormData] = useState<Shop>({
    name: '',
    description: '',
    location: '',
    categories: [],
    image: '',
    contact: {
      email: '',
      phone: '',
      instagram: '',
      facebook: '',
      twitter: ''
    },
    workingHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    policies: {
      returnPolicy: '',
      shippingPolicy: ''
    }
  });

  const categoryOptions = [
    'fashion', 'home', 'art', 'jewelry', 
    'beauty', 'electronics', 'food', 'other'
  ];

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get('https://shaddynab-new.onrender.com/api/shops/my-shop', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        setShop(response.data.data);
        setFormData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching shop:', error);
        setIsLoading(false);
      }
    };

    fetchShop();
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const onCategoryChange = (category: string) => {
    setFormData(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];

      return {
        ...prev,
        categories: newCategories
      };
    });
  };

  const onWorkingHoursChange = (day: keyof Shop['workingHours'], field: keyof WorkingHours, value?: string) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: field === 'closed' ? !prev.workingHours[day].closed : value
        }
      }
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/shops/my-shop', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setShop(response.data);
      setIsEditing(false);
      toast.success('Shop updated successfully!');
    } catch (error) {
      console.error('Error updating shop:', error);
      toast.error('Failed to update shop');
    }
  };

  if (isLoading) {
    return (
      <ProfileSection title="Shop Management">
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ProfileSection>
    );
  }

  if (!shop) {
    return (
      <ProfileSection title="Shop Management">
        <div className="p-6 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <h3 className="text-xl font-semibold">You don't have a shop yet</h3>
            <p className="text-gray-500">Create your own shop to start selling your products</p>
            <Button className="bg-primary hover:bg-primary/90">
              Create a Shop
            </Button>
          </div>
        </div>
      </ProfileSection>
    );
  }

  return (
    <ProfileSection
      title="Shop Management"
      action={
        !isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit size={16} /> Edit Shop
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="shop-form"
            >
              Save Changes
            </Button>
          </div>
        )
      }
    >
      {!isEditing ? (
        <div className="space-y-8">
          {/* Shop Overview */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{shop.name}</h3>
                <div className="flex gap-2">
                  {shop.categories.map(category => (
                    <span 
                      key={category} 
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{shop.description}</p>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-500" />
                  <h4 className="font-medium">Location</h4>
                </div>
              </CardHeader>
              <CardContent>
                <p>{shop.location}</p>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gray-500" />
                  <h4 className="font-medium">Working Hours</h4>
                </div>
              </CardHeader>
              <CardContent>
                {/*<div className="space-y-2">
                 {daysOfWeek.map(day => (
                    <div key={day} className="flex items-center justify-between text-sm">
                      <span className="capitalize font-medium">{day}</span>
                      {shop.workingHours[day].closed ? (
                        <span className="text-gray-500">Closed</span>
                      ) : (
                        <span>
                          {shop.workingHours[day].open} - {shop.workingHours[day].close}
                        </span>
                      )}
                    </div>
                  ))}
                </div>*/}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader className="pb-4">
                <h4 className="font-medium">Contact Information</h4>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <span>{shop.contact.email}</span>
                </div>
                {shop.contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-500" />
                    <span>{shop.contact.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-4 pt-2">
                  {shop.contact.instagram && (
                    <a href={`https://instagram.com/${shop.contact.instagram}`} target="_blank" rel="noopener noreferrer">
                      <Instagram size={18} className="text-gray-500 hover:text-pink-600" />
                    </a>
                  )}
                  {shop.contact.facebook && (
                    <a href={`https://facebook.com/${shop.contact.facebook}`} target="_blank" rel="noopener noreferrer">
                      <Facebook size={18} className="text-gray-500 hover:text-blue-600" />
                    </a>
                  )}
                  {shop.contact.twitter && (
                    <a href={`https://twitter.com/${shop.contact.twitter}`} target="_blank" rel="noopener noreferrer">
                      <Twitter size={18} className="text-gray-500 hover:text-blue-400" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Shop Policies */}
            <Card>
              <CardHeader className="pb-4">
                <h4 className="font-medium">Shop Policies</h4>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium mb-1">Return Policy</h5>
                  <p className="text-sm text-gray-600">
                    {shop.policies.returnPolicy || 'Not specified'}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-1">Shipping Policy</h5>
                  <p className="text-sm text-gray-600">
                    {shop.policies.shippingPolicy || 'Not specified'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <form id="shop-form" onSubmit={onSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Shop Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onInputChange}
                  maxLength={100}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={onInputChange}
                  maxLength={500}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={onInputChange}
                  required
                />
              </div>
              
              <div>
                <Label>Categories</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categoryOptions.map(category => (
                    <Button
                      key={category}
                      type="button"
                      variant={formData.categories.includes(category) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onCategoryChange(category)}
                    >
                      {category}
                      {formData.categories.includes(category) && (
                        <X size={14} className="ml-1" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Contact Information</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact.email">Email</Label>
                <Input
                  id="contact.email"
                  type="email"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={onInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contact.phone">Phone</Label>
                <Input
                  id="contact.phone"
                  type="tel"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={onInputChange}
                />
              </div>
              
              <div className="space-y-4">
                <Label>Social Media</Label>
                <div className="flex items-center gap-2">
                  <Instagram size={18} className="text-gray-500" />
                  <Input
                    type="text"
                    name="contact.instagram"
                    value={formData.contact.instagram}
                    onChange={onInputChange}
                    placeholder="Instagram username"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Facebook size={18} className="text-gray-500" />
                  <Input
                    type="text"
                    name="contact.facebook"
                    value={formData.contact.facebook}
                    onChange={onInputChange}
                    placeholder="Facebook username"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Twitter size={18} className="text-gray-500" />
                  <Input
                    type="text"
                    name="contact.twitter"
                    value={formData.contact.twitter}
                    onChange={onInputChange}
                    placeholder="Twitter username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Working Hours</h3>
            </CardHeader>
            {/*<CardContent className="space-y-4">
              {daysOfWeek.map(day => (
                <div key={day} className="flex items-center justify-between">
                  <Label className="capitalize w-24">{day}</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`${day}-closed`}
                        checked={formData.workingHours[day].closed}
                        onCheckedChange={() => onWorkingHoursChange(day, 'closed')}
                      />
                      <Label htmlFor={`${day}-closed`}>Closed</Label>
                    </div>
                    {!formData.workingHours[day].closed && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={formData.workingHours[day].open}
                          onChange={(e: { target: { value: string | undefined; }; }) => onWorkingHoursChange(day, 'open', e.target.value)}
                          className="w-24"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          type="time"
                          value={formData.workingHours[day].close}
                          onChange={(e: { target: { value: string | undefined; }; }) => onWorkingHoursChange(day, 'close', e.target.value)}
                          className="w-24"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>*/}
          </Card>

          {/* Shop Policies */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Shop Policies</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="return-policy">Return Policy</Label>
                <Textarea
                  id="return-policy"
                  name="policies.returnPolicy"
                  value={formData.policies.returnPolicy}
                  onChange={onInputChange}
                  rows={3}
                  placeholder="Describe your return policy..."
                />
              </div>
              <div>
                <Label htmlFor="shipping-policy">Shipping Policy</Label>
                <Textarea
                  id="shipping-policy"
                  name="policies.shippingPolicy"
                  value={formData.policies.shippingPolicy}
                  onChange={onInputChange}
                  rows={3}
                  placeholder="Describe your shipping policy..."
                />
              </div>
            </CardContent>
          </Card>
        </form>
      )}
    </ProfileSection>
  );
};

export default ShopManagementTab;