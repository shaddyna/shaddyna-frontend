// pages/index.tsx
/*import Navbar from '@/components/Header';
import LuxuryFooter from '@/components/LuxuryFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
     
      <main>

        <Navbar />
        <LuxuryFooter />
      
      </main>
    
    </div>
  );
}*/

// app/page.tsx
import Navbar from '@/components/Header';
import LuxuryFooter from '@/components/LuxuryFooter';
import Link from 'next/link';

type Shop = {
  _id: string;
  name: string;
  description: string;
  location: string;
  categories: string[];
  image: string;
  contact: {
    email: string;
    phone?: string;
  };
  createdAt: string;
};

type Skill = {
  _id: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  category: string;
  skills: string[];
  images: string[];
  averageRating?: number;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
};

/*async function getShops(): Promise<Shop[]> {
  const res = await fetch('https://shaddynab-new.onrender.com/api/shops');
  return res.json();
}

async function getSkills(): Promise<Skill[]> {
  const res = await fetch('https://shaddynab-new.onrender.com/api/skills');
  return res.json();
}

async function getUsers(): Promise<User[]> {
  const res = await fetch('https://shaddynab-new.onrender.com/api/users');
  return res.json();
}*/

async function getShops(): Promise<Shop[]> {
  try {
    const res = await fetch('https://shaddynab-new.onrender.com/api/shops');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log('✅ Shops fetch successful:', data);
    return data.data; // ✅ Return only the array of shops
  } catch (error) {
    console.error('❌ Failed to fetch shops:', error);
    return [];
  }
}


async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch('https://shaddynab-new.onrender.com/api/skills');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log('✅ Skills fetch successful:', data);
    return data.data; // ✅ Return only the array of skills
  } catch (error) {
    console.error('❌ Failed to fetch skills:', error);
    return [];
  }
}






export default async function Home() {
  const [shops, skills,] = await Promise.all([
    getShops(),
    getSkills(),
  
  ]);

  return (
    <>
     
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0f1c47] to-[#bf2c7e] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Shops & Skills
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find unique products and professional services tailored just for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#shops"
              className="bg-[#bf2c7e] hover:bg-[#a8246b] text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Browse Shops
            </Link>
            <Link
              href="#skills"
              className="bg-white hover:bg-gray-100 text-[#0f1c47] font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Explore Skills
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Shops */}
      <section id="shops" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#0f1c47]">Featured Shops</h2>
          <Link
            href="/shops"
            className="text-[#bf2c7e] hover:text-[#a8246b] font-semibold"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shops.slice(0, 6).map((shop) => (
            <div
              key={shop._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={shop.image || '/placeholder-shop.jpg'}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#0f1c47]">{shop.name}</h3>
                  <span className="bg-[#bf2c7e] text-white text-xs px-2 py-1 rounded-full">
                    {shop.categories[0]}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {shop.location}
                  </span>
                  <Link
                    href={`/shops/${shop._id}`}
                    className="text-[#bf2c7e] hover:text-[#a8246b] text-sm font-semibold"
                  >
                    Visit Shop →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Skills */}
      <section id="skills" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-[#0f1c47]">Popular Skills</h2>
            <Link
              href="/hub"
              className="text-[#bf2c7e] hover:text-[#a8246b] font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.slice(0, 6).map((skill) => (
              <div
                key={skill._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={skill.images?.[0] || '/placeholder-skill.jpg'}
                    alt={skill.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#0f1c47]">
                      {skill.title}
                    </h3>
                    <span className="bg-[#bf2c7e] text-white text-xs px-2 py-1 rounded-full">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {skill.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-[#0f1c47]">
                        Ksh {skill.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        • {skill.deliveryTime}
                      </span>
                    </div>
                    {skill.averageRating && (
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm text-gray-600">
                          {skill.averageRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#0f1c47] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to find what you need?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of happy customers discovering amazing products and
            services every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-[#bf2c7e] hover:bg-[#a8246b] text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Sign Up Now
            </Link>
            <Link
              href=""
              className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border border-white transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
     <LuxuryFooter />
    </>
  );
}

