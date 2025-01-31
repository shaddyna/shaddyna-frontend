/*"use client"

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('https://shaddyna-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.status !== 200) {
        setError(data.message);
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (error) {
      setError('Error during login');
    }
  };

  const handleSignUpClick = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 overflow-hidden">
      <div className="relative shadow-2xl rounded-3xl p-8 max-w-md w-full border border-[#ff199c]">
        {/* Decorative Elements *
        <div className="absolute -top-10 -left-10 bg-[#ff199c] w-32 h-32 rounded-full blur-2xl opacity-10 z-[-1]"></div>
        <div className="absolute -bottom-10 -right-10 bg-[#182155] w-40 h-40 rounded-full blur-2xl opacity-10 z-[-1]"></div>

        <h1 className="text-4xl font-extrabold text-center text-[#182155] mb-6">Welcome Back!</h1>
        <p className="text-center text-gray-700 mb-4">Login to continue to your account</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <div className="text-right mb-6">
            <a href="/forgot-password" className="text-[#182155] hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff199c] text-white py-3 rounded-full font-bold hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-[#182155] shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Sign up link moved below the form *
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <span
              onClick={handleSignUpClick}
              className="text-[#182155] font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;*/


"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";


const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate token expiration
  const validateToken = (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new Error("Token has expired");
      }
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/login");
      setError("Session expired. Please log in again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://shaddyna-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.status !== 200) {
        // Improve error handling based on specific scenarios
        setError(data.message || "Invalid credentials. Please try again.");
        return;
      }

      const { token } = data;

      // Validate and store token
      validateToken(token);
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error) {
      setError("An error occurred while trying to log in. Please try again.");
    }
  };

  // Handle sign-up redirection
  const handleSignUpClick = () => {
    router.push("/register");
  };

  // Auto-logout on token expiration
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 overflow-hidden">
      <div className="relative shadow-2xl rounded-3xl p-8 max-w-md w-full border border-[#ff199c]">
        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 bg-[#ff199c] w-32 h-32 rounded-full blur-2xl opacity-10 z-[-1]"></div>
        <div className="absolute -bottom-10 -right-10 bg-[#182155] w-40 h-40 rounded-full blur-2xl opacity-10 z-[-1]"></div>

        <h1 className="text-4xl font-extrabold text-center text-[#182155] mb-6">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-700 mb-4">
          Login to continue to your account
        </p>
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
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
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
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
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                />
              </span>
            </div>
          </div>
          <div className="text-right mb-6">
            <a href="/forgot-password" className="text-[#182155] hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff199c] text-white py-3 rounded-full font-bold hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-[#182155] shadow-md"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <span
              onClick={handleSignUpClick}
              className="text-[#182155] font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
