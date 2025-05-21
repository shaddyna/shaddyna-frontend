// data/servicesData.ts
export const services = [
  {
    id: 1,
    title: "Luxury Brand Identity Design",
    provider: {
      name: "Sophia Chen",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 4.9,
      projects: 124,
    },
    category: "Graphic Design",
    skills: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    price: "$500-$2000",
    deliveryTime: "7-14 days",
    description: "Crafting premium brand identities for luxury fashion houses and boutique businesses. Includes logo, color palette, typography, and full brand guidelines.",
    isFeatured: true,
    isProVerified: true,
  },
  // ... other service objects
];

export const categories = [
  "All Categories",
  "Graphic Design",
  "Web Development",
  "Photography",
  "Digital Marketing",
  "Writing",
  "3D Design",
  "Video Production",
  "Fashion Design"
];

export const serviceLevels = [
  { name: "Basic", value: "basic" },
  { name: "Standard", value: "standard" },
  { name: "Premium", value: "premium" },
  { name: "Enterprise", value: "enterprise" }
];

export const deliveryTimes = [
  { name: "Under 1 week", value: "1week" },
  { name: "1-2 weeks", value: "2weeks" },
  { name: "2-4 weeks", value: "4weeks" },
  { name: "1+ month", value: "1month" }
];