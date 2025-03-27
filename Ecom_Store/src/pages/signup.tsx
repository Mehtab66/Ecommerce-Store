import React, { useState } from "react";
import signupImage from "../../public/images/ecommerce-seo-tips.jpg";
import { getAuth, createUserWithEmailAndPassword, updateProfile,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../services/firebase";
import { toast } from "react-hot-toast";
import GoogleIcon from "../../public/icons/icons8-google-48.png"; // Add a Google logo in `public/icons/google.svg`

const provider = new GoogleAuthProvider();

const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Signup Data:", formData);

      // Create user with email & password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log("User:", user);

      // Update user profile with the name
      await updateProfile(user, { displayName: formData.name });

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
        role: "user",
      });

      toast.success("Signup Successful! 🎉");
    } catch (error) {
      console.error("Error:", error.code, error.message);
      toast.error("Signup Failed. Try again.");
    }
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
        role: "user",
      });

      toast.success("Signup Successful! 🎉");
    } catch (error) {
      console.error("Error:", error.code, error.message);
      toast.error("Signup Failed. Try again.");
    }
  }

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

            {/* Google Login Button */}
            <div className="mt-6 flex flex-col items-center">
              <p className="text-gray-600 text-sm">Or sign up with</p>
              <button
                onClick={handleGoogleLogin}
                className="w-full mt-2 flex items-center justify-center gap-3 bg-white border border-gray-300 py-2 px-10 rounded-xl shadow hover:shadow-lg transition-all duration-300"
              >
                <img src={GoogleIcon} alt="Google Logo" className="w-5 h-5" />
                <span className="text-gray-700 font-medium">SignUp with Google</span>
              </button>
            </div>

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
