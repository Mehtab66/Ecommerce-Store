import React, { useState } from "react";
import signupImage from "../../public/images/ecommerce-seo-tips.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    alert("Signup Successful! 🎉");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 md:p-0">
      <div className="w-full h-screen md:h-auto md:max-w-6xl flex flex-col md:flex-row bg-white rounded-none md:rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white/95 backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3 animate-in fade-in">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Get Started
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Log in
              </a>
            </p>
          </div>
        </div>

        {/* Image Section - Hidden on mobile */}
       <div className="hidden md:flex md:w-1/2 p-6 md:p-12 items-center justify-center bg-gray-50">
          <div className="max-w-md w-full h-full flex flex-col justify-center relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={signupImage}
              alt="Welcome to our store"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-semibold">
                Welcome to Your Shopping Journey
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;