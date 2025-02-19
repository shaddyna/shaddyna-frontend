// pages/skills/[id]/page.tsx

'use client';

import Back from '@/components/Back';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import { FaHeart } from 'react-icons/fa';

const skills = [
    {
      id: 1,
      name: "Earling",
      level: "6",
      rating: "4.5",
      description: "Design UI/UX of mobile app or website with Figma",
      price: "50",
      image: "https://i.pinimg.com/474x/49/fd/16/49fd16a3ed3ab7771570f7c21268b8fe.jpg",
      pimage: "https://i.pinimg.com/236x/ea/4b/47/ea4b474c5392b809224a060beb2a0b1c.jpg",
      portfolio: [
        {
          image: "https://via.placeholder.com/400x300",
          title: "E-commerce App UI",
          description: "Created a sleek, modern UI design for a mobile e-commerce application.",
        },
        {
          image: "https://via.placeholder.com/400x300",
          title: "Travel Website Redesign",
          description: "Redesigned a travel booking website to improve user experience.",
        },
      ],
      reviews: [
        { username: "Alex", rating: 5, comment: "Amazing designs, very professional!" },
        { username: "Jess", rating: 4, comment: "Great work, but took a bit longer than expected." },
      ],
    },
    {
      id: 2,
      name: "Sisco",
      level: "5",
      rating: "5.5",
      description: "Learn design like a pro",
      price: "60",
      image: "https://i.pinimg.com/474x/ae/a4/49/aea44995c79c76b647ed277fa7bc676b.jpg",
      pimage: "https://i.pinimg.com/236x/03/e7/55/03e7556fd4449f4c654b749c3700f563.jpg",
      portfolio: [
        {
          image: "https://via.placeholder.com/400x300",
          title: "Logo Design Workshop",
          description: "Conducted a workshop teaching professional logo design skills.",
        },
        {
          image: "https://via.placeholder.com/400x300",
          title: "Design Masterclass",
          description: "Designed curriculum and trained beginners in design principles.",
        },
      ],
      reviews: [
        { username: "Mike", rating: 5, comment: "Clear and easy to follow. Learned a lot!" },
        { username: "Nina", rating: 4.5, comment: "Very knowledgeable and patient." },
      ],
    },
    {
      id: 3,
      name: "Muggie",
      level: "3",
      rating: "4.5",
      description: "Have your photos professionally edited for your memories",
      price: "70",
      image: "https://i.pinimg.com/736x/3e/06/0d/3e060d23c0a6547e504be1323880ebd6.jpg",
      pimage: "https://i.pinimg.com/474x/09/5b/da/095bdab54e9d738120ba53cb5829c9e8.jpg",
      portfolio: [
        {
          image: "https://via.placeholder.com/400x300",
          title: "Wedding Album Edits",
          description: "Professionally edited a wedding album for timeless memories.",
        },
        {
          image: "https://via.placeholder.com/400x300",
          title: "Portrait Enhancements",
          description: "Enhanced client portraits for use in professional settings.",
        },
      ],
      reviews: [
        { username: "Liam", rating: 4.8, comment: "The edits were beautiful and exceeded my expectations!" },
        { username: "Sophia", rating: 4.2, comment: "Loved the work, but could improve communication." },
      ],
    },
    {
      id: 4,
      name: "Scott",
      level: "7",
      rating: "7.5",
      description: "Your videographer is here to give you top-notch services",
      price: "80",
      image: "https://i.pinimg.com/736x/03/7f/d2/037fd24802f9d193cdfa502f9de66e50.jpg",
      pimage: "https://i.pinimg.com/236x/57/b9/f7/57b9f7b43dd81a29dbac0246fdc7a64d.jpg",
      portfolio: [
        {
          image: "https://i.pinimg.com/736x/48/29/a7/4829a72d9aa4970910bcdff0513ab626.jpg",
          title: "Event Highlights",
          description: "Captured and edited a corporate event’s highlights.",
        },
        {
          image: "https://i.pinimg.com/236x/d2/df/8a/d2df8afd226e4f5278c94bdef79e212c.jpg",
          title: "Music Video Production",
          description: "Directed and edited a music video for an upcoming artist.",
        },
      ],
      reviews: [
        { username: "Chris", rating: 5, comment: "Top-notch video quality, very creative!" },
        { username: "Emma", rating: 4.5, comment: "Excellent work, but editing took some time." },
      ],
    },
    {
      id: 5,
      name: "Frankie",
      level: "8",
      rating: "7.5",
      description: "Shoot eye-catching product photography",
      price: "90",
      image: "https://i.pinimg.com/736x/2f/9b/84/2f9b841cf8c65fc85d5b7d6946aa90f7.jpg",
      pimage: "https://i.pinimg.com/236x/68/75/e7/6875e77d033809bcfcba37cbeebbb611.jpg",
      portfolio: [
        {
          image: "https://via.placeholder.com/400x300",
          title: "Product Photography",
          description: "Shot high-quality photos for an online store’s product catalog.",
        },
        {
          image: "https://via.placeholder.com/400x300",
          title: "Food Photography",
          description: "Photographed dishes for a restaurant’s menu and social media.",
        },
      ],
      reviews: [
        { username: "David", rating: 5, comment: "Amazing shots that brought our products to life!" },
        { username: "Olivia", rating: 4.8, comment: "Very creative and professional." },
      ],
    },
    {
      id: 6,
      name: "Mizzo",
      level: "9",
      rating: "9.5",
      description: "Have your software developed in minutes by a pro",
      price: "100",
      image: "https://i.pinimg.com/736x/36/32/77/363277e803a2054eee7fdb73969e02f7.jpg",
      pimage: "https://i.pinimg.com/474x/21/43/fe/2143fe08f40987b510ca5d5f8bac748f.jpg",
      portfolio: [
        {
          image: "https://via.placeholder.com/400x300",
          title: "Custom CRM Software",
          description: "Developed a custom CRM tool for client management.",
        },
        {
          image: "https://via.placeholder.com/400x300",
          title: "E-Learning Platform",
          description: "Built an e-learning platform with user-friendly features.",
        },
      ],
      reviews: [
        { username: "Ethan", rating: 5, comment: "Brilliant software, delivered ahead of schedule!" },
        { username: "Ava", rating: 4.9, comment: "Great developer, very responsive and efficient." },
      ],
    },
  ];
  

const SkillDetail = () => {
  const params = useParams() as Record<string, string>;
const { id } = params;

  //const params = useParams();
  //const { id } = params;

  // Find the skill from the skills array based on id
  const skill = skills.find(skill => skill.id === Number(id));

  if (!skill) {
    return <div>Loading...</div>; // Handle case when skill is not found
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
        <Back title={'Skill details'} />
      <div className="px-3 pb-4">
        <h2 className="text-2xl text-gray-800 font-semibold text-left mb-2">{skill.name} Details</h2>
        
        <div className="bg-white p-2 rounded-lg border border-gray-300">
          <img
            src={skill.image}
            alt={skill.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <div className="flex items-center justify-between">
            {/* Profile Picture Placeholder and Name */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 ring-2 ring-[#ff199c]">
                <img 
                  src={skill.pimage} 
                  alt={skill.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="ml-2 text-gray-800 text-sm flex flex-col">
                <p className="font-bold">{skill.name}</p>
                <p>Level {skill.level}</p>
              </div>
            </div>
            {/* Heart Icon */}
            <div className="w-5 h-5 flex justify-center items-center text-red-500 hover:text-red-600 transition">
              <FaHeart className="w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-600 mt-2">{skill.description}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <p className="text-lg font-bold text-yellow-500">{skill.rating}</p>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-yellow-500 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.217 3.742a1 1 0 00.95.69h3.946c.969 0 1.371 1.24.588 1.81l-3.194 2.318a1 1 0 00-.364 1.118l1.217 3.742c.3.921-.755 1.688-1.538 1.118l-3.194-2.318a1 1 0 00-1.176 0l-3.194 2.318c-.783.57-1.838-.197-1.538-1.118l1.217-3.742a1 1 0 00-.364-1.118L2.293 9.17c-.783-.57-.38-1.81.588-1.81h3.946a1 1 0 00.95-.69l1.217-3.742z" />
              </svg>
            </div>
            <p className="text-lg font-bold text-gray-800"><span className='text-sm text-gray-400'>from</span> Ksh{skill.price}</p>
          </div>
        </div>
          {/* Portfolio Section */}
        <div className="mt-3">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Portfolio</h3>
            <div className="grid grid-cols-2 gap-4">
            {skill.portfolio.map((project, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-2">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h4 className="text-md font-semibold text-gray-800">{project.title}</h4>
                <p className="text-sm text-gray-600">{project.description}</p>
                </div>
            ))}
            </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Pricing</h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {/* Skill Provider Details */}
            <div className="flex items-center mb-4">
            <img
                src={skill.pimage}
                alt={skill.name}
                className="w-12 h-12 object-cover rounded-full border-2 border-gray-300 mr-3"
            />
            <div>
                <h4 className="text-md font-bold text-gray-800">{skill.name}</h4>
                <p className="text-sm text-gray-600">Skill Level: {skill.level}</p>
            </div>
            </div>

            {/* Pricing Tiers */}
            <div className="mb-4">
            <h4 className="text-md font-bold text-gray-800 mb-2">Pricing Tiers</h4>
            <ul className="space-y-2">
                <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                <span className="text-sm text-gray-800">Basic </span>
                <span className="text-sm text-gray-600">Delivery: 3 days</span>
                <span className="text-lg font-bold text-[#ff199c]">Ksh50</span>
                </li>
                <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                <span className="text-sm text-gray-800">Standard </span>
                <span className="text-sm text-gray-600">Delivery: 5 days</span>
                <span className="text-lg font-bold text-[#ff199c]">Ksh80</span>
                </li>
                <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                <span className="text-sm text-gray-800">Premium </span>
                <span className="text-sm text-gray-600">Delivery: 7 days</span>
                <span className="text-lg font-bold text-[#ff199c]">Ksh120</span>
                </li>
            </ul>
            </div>

            {/* Additional Details */}
            <div className="border-t border-gray-300 pt-3">
            <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Rating:</span> {skill.rating} ⭐
            </p>
            <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Description:</span> {skill.description}
            </p>
            <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Revisions:</span> Up to 3 revisions included
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold">Support:</span> 24/7 customer support available
            </p>
            </div>

            {/* Call to Action */}
            <div className="mt-4">
            <button className="w-full px-4 py-2 text-white bg-[#182155] rounded-lg hover:bg-blue-900 transition">
                Contact for Service
            </button>
            </div>
        </div>
{/* Review Section */}
<div className="mt-6">
  <h3 className="text-lg font-bold text-gray-800 mb-4">Reviews</h3>

  {/* Existing Reviews */}
  <div className="flex space-x-4 overflow-x-auto scrollbar-hidden">
    {skill.reviews?.length > 0 ? (
      skill.reviews.map((review, index) => (
        <div
          key={index}
          className="flex-shrink-0 min-w-[300px] p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="flex items-center mb-2">
            <img
              src={`https://i.pinimg.com/236x/54/95/07/549507b290b7b3ee0626e5710a354f39.jpg`}
              alt={review.username}
              className="w-10 h-10 object-cover rounded-full mr-3"
            />
            <div>
              <h4 className="text-sm font-bold text-gray-800">{review.username}</h4>
              <p className="text-xs text-gray-500">Rating: {review.rating} ⭐</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{review.comment}</p>
        </div>
      ))
    ) : (
      <p className="text-sm text-gray-500">No reviews yet. Be the first to review!</p>
    )}
  </div>

  {/* Add Review Form */}
  <div className="mt-6">
    <h4 className="text-md font-bold text-gray-800 mb-2">Add Your Review</h4>
    <form className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-1" htmlFor="username">
          Your Name
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#ff199c]"
          required
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-1" htmlFor="rating">
          Rating
        </label>
        <select
          id="rating"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#ff199c]"
          required
        >
          <option value="">Select a rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-1" htmlFor="comment">
          Review
        </label>
        <textarea
          id="comment"
          placeholder="Write your review here"
          //rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#ff199c]"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#182155] text-white font-bold rounded-lg hover:bg-blue-900 transition"
      >
        Submit Review
      </button>
    </form>
  </div>
</div>



        </div>

      </div>
      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default SkillDetail;
