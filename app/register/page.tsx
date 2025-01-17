// pages/signup.tsx
/*'use client'; // Ensure the component runs on the client side

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the correct router for the app directory

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('https://shaddyna-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.status !== 201) {
        setError(data.message);
        return;
      }

      router.push('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setError('Error during signup');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
        <p className="text-center text-gray-600 mb-4">Sign up to join our platform</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-teal-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;*/


'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the correct router for the app directory
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('https://shaddyna-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.status !== 201) {
        setError(data.message);
        return;
      }

      router.push('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setError('Error during signup');
    }
  };
  const handleSignInClick = () => {
    router.push('/login');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <div className="relative shadow-2xl rounded-3xl p-8 max-w-md w-full border border-[#ff199c]">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 bg-[#ff199c] w-32 h-32 rounded-full blur-2xl opacity-10"></div>
          <div className="absolute -bottom-10 -right-10 bg-[#182155] w-40 h-40 rounded-full blur-2xl opacity-10"></div>

          <h1 className="text-4xl font-extrabold text-center text-[#182155] mb-6">Create an Account</h1>
          <p className="text-center text-gray-700 mb-4">Sign up to join our platform</p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-[#ff199c]"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-[#ff199c]"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-[#ff199c]"
              />
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-[#ff199c] text-black"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff199c] text-white py-3 rounded-full font-bold hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-[#182155] shadow-md"
            >
              Sign Up
            </button>
          </form>
        
          {/* Sign up link moved below the form */}
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Already have an account?{' '}
              <span
                onClick={handleSignInClick}
                className="text-[#182155] font-semibold cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default SignUp;
