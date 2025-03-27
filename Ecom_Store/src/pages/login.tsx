import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import LoginImage from "../../public/images/download.png";
import GoogleLogo from "../../public/icons/icons8-google-48.png";
import {app} from "../services/firebase"; // Ensure you have Firebase initialized

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const Login = () => {
    
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert("Welcome Back! 🎉");
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date()
          });
          console.log("New user created in Firestore");
        } else {
          console.log("User already exists");
        }
        alert(`Welcome, ${user.displayName}! 🎉`);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-teal-500 via-cyan-600 to-blue-600 p-4 md:p-0 overflow-hidden">
      <div className="w-full h-screen md:h-auto md:max-w-6xl flex flex-col md:flex-row bg-white rounded-none md:rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 p-6 md:p-12 items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-200 relative">
          <img src={LoginImage} alt="Welcome back" className="w-full h-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white/95 backdrop-blur-xl relative">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <LogIn className="w-8 h-8 text-teal-600" /> Log In
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
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
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
              >
                Log In Now
              </button>
            </form>
            
            {/* Google Login Button */}
            <button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 px-6 rounded-xl shadow-md hover:bg-gray-100 transition-all"
            >
              <img src={GoogleLogo} alt="Google" className="w-6 h-6" />
              <span>Log In with Google</span>
            </button>
            
            <div className="mt-6 flex justify-between text-sm text-gray-600">
              <a href="/forgot-password" className="hover:text-teal-600">Forgot Password?</a>
              <p>
                New here? <a href="/" className="text-teal-600 font-medium">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
